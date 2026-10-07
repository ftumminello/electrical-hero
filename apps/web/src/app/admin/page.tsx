import type { Metadata } from "next";
import { AdminView } from "@/features/admin/views/admin-view";

export const metadata: Metadata = { title: "Admin" };

// Served at /admin on every host, and at admin.electrical-hero.com/ via the host rewrite in next.config.ts.
export default function AdminPage() {
  return <AdminView />;
}
