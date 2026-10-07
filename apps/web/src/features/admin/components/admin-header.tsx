"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@electrical-hero/shared";
import { cn } from "@electrical-hero/design-system/cn";
import { BookOpen, ExternalLink, Plug, ShieldCheck } from "@electrical-hero/core/icons";
import { Text } from "@electrical-hero/core/shared/text";

/** The trainee site the admin area links back to (it lives on another host). */
const TRAINING_URL = process.env.NEXT_PUBLIC_TRAINING_URL ?? "https://electrical-hero.com";

// Links use /admin paths, which work on every host. On admin.electrical-hero.com the browser path can also
// be "/", "/safety-protocols" or "/electrical-codes" (the host rewrite), so matching accepts both forms.
const NAV = [
  { href: "/admin", label: "Integrations", icon: Plug, matches: (path: string) => path === "/" || path === "/admin" },
  {
    href: "/admin/safety-protocols",
    label: "Safety protocols",
    icon: ShieldCheck,
    matches: (path: string) => path.endsWith("/safety-protocols"),
  },
  {
    href: "/admin/electrical-codes",
    label: "Electrical codes",
    icon: BookOpen,
    matches: (path: string) => path.endsWith("/electrical-codes"),
  },
];

/** Admin replaces the trainee header: different audience, and its nav would point at the wrong pages. */
export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-surface-inverse">
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex flex-row items-center gap-3">
          <Text as="span" variant="heading" className="uppercase text-ink-inverse">
            {APP_NAME}
          </Text>
          <span className="rounded-sm bg-voltage px-2 py-0.5 text-ink-on-voltage type-eyebrow">Admin</span>
        </div>
        <nav aria-label="Admin">
          <ul className="flex flex-row gap-1">
            {NAV.map(({ href, label, icon: Icon, matches }) => {
              const active = matches(pathname);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 flex-row items-center gap-2 rounded px-3",
                      active ? "bg-voltage" : "hover:bg-ink-inverse/10",
                    )}
                  >
                    <Icon
                      aria-hidden
                      size={18}
                      strokeWidth={2}
                      className={active ? "text-ink-on-voltage" : "text-ink-inverse"}
                    />
                    <Text
                      as="span"
                      variant="label"
                      className={cn("sr-only sm:not-sr-only", active ? "text-ink-on-voltage" : "text-ink-inverse")}
                    >
                      {label}
                    </Text>
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={TRAINING_URL}
                className="flex min-h-11 flex-row items-center gap-2 rounded px-3 text-ink-inverse hover:bg-ink-inverse/10"
              >
                <ExternalLink aria-hidden size={18} strokeWidth={2} />
                <Text as="span" variant="label" className="sr-only text-ink-inverse sm:not-sr-only">
                  Training site
                </Text>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
