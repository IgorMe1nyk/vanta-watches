"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WatchScene = dynamic(() => import("./WatchScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the 3D scene only after first paint (idle callback) and only
 * when motion is allowed — the hero text always wins LCP and
 * reduced-motion users get a calm static composition instead.
 */
export default function HeroWatch({
  scrollRef,
}: {
  scrollRef?: React.MutableRefObject<number>;
}) {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAllowed(false);
      return;
    }
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => setReady(true), { timeout: 1400 })
      : window.setTimeout(() => setReady(true), 600);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  if (!allowed) {
    return (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 42% at 50% 52%, rgba(200,168,107,0.16), transparent 70%)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden data-cursor-label="Drag">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 38% at 50% 52%, rgba(200,168,107,0.13), transparent 70%)",
        }}
      />
      {ready && <WatchScene scrollRef={scrollRef} />}
    </div>
  );
}
