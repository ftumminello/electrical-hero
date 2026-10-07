import type { Metadata } from "next";
import { SafetyProtocolsView } from "@/features/admin/views/safety-protocols-view";

export const metadata: Metadata = { title: "Safety protocols" };

export default function SafetyProtocolsPage() {
  return <SafetyProtocolsView />;
}
