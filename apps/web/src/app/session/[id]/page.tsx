import type { Metadata } from "next";
import { ProblemView } from "@/features/problem/views/problem-view";

export const metadata: Metadata = { title: "Problem" };

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProblemView sessionId={id} />;
}
