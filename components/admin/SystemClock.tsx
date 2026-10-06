"use client";

import { useEffect, useState } from "react";

/** Tray clock like the desktop's: "Thu 02 Oct  14:21". Rendered after mount. */
export default function SystemClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer = 0;
    // Tick on each minute boundary rather than polling.
    const tick = () => {
      const current = new Date();
      setNow(current);
      timer = window.setTimeout(tick, 60_000 - current.getSeconds() * 1000 - current.getMilliseconds() + 50);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  if (!now) return <span className="adm-clock" aria-hidden="true" />;

  return (
    <time className="adm-clock" dateTime={now.toISOString()}>
      <span>
        {now.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })}
      </span>
      <strong>{now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</strong>
    </time>
  );
}
