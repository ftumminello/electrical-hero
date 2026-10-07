import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { APP_NAME } from "@electrical-hero/shared";
import { ThemeProvider } from "@electrical-hero/core/providers/theme-provider";
import { ThemeScript } from "@electrical-hero/core/providers/theme-script";
import { AppHeader } from "@/features/shell/components/app-header";
import "./globals.css";

// Variable names match the `type-*` utilities in the design-system preset.
const display = Barlow_Condensed({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ weight: ["500"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Train like a pro. Work safe. Get licensed.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // ThemeScript sets data-theme before hydration, so the attribute differs from the server render.
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <AppHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
