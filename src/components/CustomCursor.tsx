"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let label = "";
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const hit = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      hovering = Boolean(hit);
      label = hit?.dataset.cursor || "";
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;

      const el = cursorRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        el.dataset.hover = hovering ? "true" : "false";
      }
      if (labelRef.current) {
        labelRef.current.textContent = hovering ? label : "";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="site-cursor pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full bg-[#0055ff]"
    >
      <span
        ref={labelRef}
        className="site-cursor-label font-mono text-[8px] font-bold uppercase tracking-widest text-white"
      />
    </div>
  );
}
