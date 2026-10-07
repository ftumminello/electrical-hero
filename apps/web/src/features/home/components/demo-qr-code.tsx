"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Text } from "@electrical-hero/core/shared/text";

/** Scan-to-demo QR code that sits in the page's left margin on wide screens. */
export function DemoQrCode() {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  if (!href) return null;

  return (
    <aside
      className="absolute top-1/2 hidden w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 2xl:flex"
      style={{ left: "calc((100vw - 64rem) / 4)" }}
      aria-label="Demo QR code"
    >
      <div className="rounded bg-white p-3">
        <QRCodeSVG value={href} size={112} />
      </div>
      <Text variant="spec" className="text-center text-ink-inverse">
        Scan to try the demo<br />on your phone
      </Text>
    </aside>
  );
}
