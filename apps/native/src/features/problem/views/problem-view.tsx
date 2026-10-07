import { useRef } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft } from "@electrical-hero/core/icons";
import { useTrainingSession } from "@electrical-hero/core/hooks/use-training-session";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { Text } from "@electrical-hero/core/shared/text";
import { ErrorState, LoadingState } from "@features/shell/components/request-state";
import { SectionHeading } from "@features/shell/components/section-heading";
import { DebriefCard } from "@features/training/components/debrief-card";
import { CoachChat } from "../components/coach-chat";
import { ProblemBrief } from "../components/problem-brief";

export function ProblemView({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const training = useTrainingSession(sessionId);
  const { session } = training;

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        ref={scrollRef}
        className="flex-1 bg-surface-100"
        contentContainerClassName="gap-8 px-4 pb-12"
        contentContainerStyle={{ paddingTop: insets.top + 8 }}
        keyboardShouldPersistTaps="handled"
        // Follow the reply while it streams in.
        onContentSizeChange={() => training.isStreaming && scrollRef.current?.scrollToEnd({ animated: true })}
      >
        <Pressable
          accessibilityRole="link"
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          className="min-h-11 flex-row items-center gap-2 self-start"
        >
          <ArrowLeft size={18} strokeWidth={2} color={colors["neutral-blue"]} />
          <Text variant="label" className="text-neutral-blue">
            Back
          </Text>
        </Pressable>

        {training.isLoading && <LoadingState label="Loading the job" />}
        {training.loadError && !session && <ErrorState message={training.loadError} onRetry={training.reload} />}

        {session && (
          <>
            <ProblemBrief
              mode={session.mode}
              account={training.account}
              scenario={training.scenario}
              template={training.template}
            />
            {training.debrief && (
              <View className="gap-4">
                <SectionHeading eyebrow="Debrief" title="How you did" />
                <DebriefCard debrief={training.debrief} />
              </View>
            )}
            <CoachChat
              mode={session.mode}
              messages={training.messages}
              streamingReply={training.streamingReply}
              isCompleted={training.isCompleted}
              sendError={training.sendError}
              onSend={training.send}
              canFinish={training.canFinish}
              isGrading={training.isGrading}
              gradeError={training.gradeError}
              onFinish={training.finish}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
