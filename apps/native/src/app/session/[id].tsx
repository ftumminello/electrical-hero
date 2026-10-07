import { useLocalSearchParams } from "expo-router";
import { ProblemView } from "@features/problem/views/problem-view";

export default function SessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProblemView sessionId={id} />;
}
