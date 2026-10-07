"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Text } from "@electrical-hero/core/shared/text";

/**
 * Scan-to-demo QR code. From lg it sits inside the hero's right edge (the home view reserves
 * room for it); from 2xl, where the margin is wide enough, it moves out into the left margin.
 */
export function DemoQrCode() {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  if (!href) return null;

  return (
    <aside
      className="absolute top-1/2 hidden w-40 -translate-y-1/2 flex-col items-center gap-3 lg:right-[max(1rem,calc((100vw_-_64rem)_/_2_+_1.5rem))] lg:flex 2xl:right-auto 2xl:left-[calc((100vw_-_64rem)_/_4)] 2xl:-translate-x-1/2"
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
