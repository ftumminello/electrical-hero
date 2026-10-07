import type { ReactNode } from "react";
import { AdminHeader } from "@/features/admin/components/admin-header";

/** Every admin page gets the admin header; the trainee header hides itself on this segment. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
