"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { APP_NAME } from "@electrical-hero/shared";
import { cn } from "@electrical-hero/design-system/cn";
import { Trophy, UserRound, Zap } from "@electrical-hero/core/icons";
import { Text } from "@electrical-hero/core/shared/text";

const NAV = [
  { href: "/", label: "Train", icon: Zap, matches: (path: string) => path === "/" || path.startsWith("/session") },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy, matches: (path: string) => path === "/leaderboard" },
  {
    href: "/account",
    label: "Account",
    icon: UserRound,
    matches: (path: string) => path === "/account" || path === "/history",
  },
];

export function AppHeader() {
  const pathname = usePathname();
  // The admin area (admin.electrical-hero.com) renders its own header. The segment reflects the route
  // actually rendered, so this also holds when the host rewrite serves /admin at "/".
  const segment = useSelectedLayoutSegment();
  if (segment === "admin") return null;

  return (
    <header className="bg-surface-inverse">
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="rounded-sm">
          <Text as="span" variant="heading" className="uppercase text-ink-inverse">
            {APP_NAME}
          </Text>
        </Link>
        <nav aria-label="Main">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
