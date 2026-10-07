"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Minimal typing for the Web Speech API (not in TypeScript's DOM lib).
// Chrome, Edge and Safari support it; Firefox doesn't, so the mic is hidden there.
type SpeechRecognitionResultEvent = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const getRecognition = (): SpeechRecognitionConstructor | undefined => {
  if (typeof window === "undefined") return undefined;
  const w = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
};

const subscribeNever = () => () => {};

const ERROR_MESSAGE: Record<string, string> = {
  "not-allowed": "Microphone access is blocked. Allow it in your browser settings to answer by voice.",
  "no-speech": "Didn't catch that. Tap the mic and try again.",
  "audio-capture": "No microphone found.",
};

/** Dictation for answer fields. Each finished phrase is passed to `onTranscript`. */
export function useSpeechToText(onTranscript: (text: string) => void) {
  // false on the server and during hydration, then the real value.
  const isSupported = useSyncExternalStore(subscribeNever, () => Boolean(getRecognition()), () => false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onTranscriptRef = useRef(onTranscript);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  const start = () => {
    const Recognition = getRecognition();
    if (!Recognition || recognitionRef.current) return;

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]!;
        if (result.isFinal) onTranscriptRef.current(result[0].transcript.trim());
      }
    };
    recognition.onerror = (event) => {
      if (event.error !== "aborted") setError(ERROR_MESSAGE[event.error] ?? "Voice input stopped. Try again.");
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
    };

    setError(null);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stop = () => recognitionRef.current?.stop();

  return { isSupported, isListening, error, start, stop };
}
