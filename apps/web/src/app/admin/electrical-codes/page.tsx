import type { Metadata } from "next";
import { ElectricalCodesView } from "@/features/admin/views/electrical-codes-view";

export const metadata: Metadata = { title: "Electrical codes" };

export default function ElectricalCodesPage() {
  return <ElectricalCodesView />;
}
