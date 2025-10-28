"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";

type Point = { x: number; y: number };
type RectLite = { left: number; top: number; width: number; height: number };

type LayerContext = {
  getLocalPoint: (p: Point) => Point;
  register: (r: () => ReactNode) => () => void;
};

const Ctx = createContext<LayerContext | null>(null);
export function useConnectorLayer(): LayerContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("ConnectorLayer: missing context");
  return ctx;
}

export default function ConnectorLayer({
  children,
  className = "",
  hideOnMobile = false, // montrer pendant l’intégration
}: PropsWithChildren<{ className?: string; hideOnMobile?: boolean }>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const renderersRef = useRef<Array<() => ReactNode>>([]);
  const [renderTick, setRenderTick] = useState(0);
  const [rect, setRect] = useState<RectLite | null>(null);

  const register = useCallback((r: () => ReactNode) => {
    renderersRef.current = [...renderersRef.current, r];
    setRenderTick((t) => t + 1);
    return () => {
      renderersRef.current = renderersRef.current.filter((x) => x !== r);
      setRenderTick((t) => t + 1);
    };
  }, []);

  const getLocalPoint = useCallback(
    (p: Point): Point => {
      const r = rect;
      if (!r) return p;
      return { x: p.x - r.left, y: p.y - r.top };
    },
    [rect],
  );

  const measure = useCallback(() => {
    const el = hostRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next: RectLite = {
      left: r.left,
      top: r.top,
      width: Math.max(1, r.width),
      height: Math.max(1, r.height),
    };
    setRect((prev) =>
      !prev ||
      prev.left !== next.left ||
      prev.top !== next.top ||
      prev.width !== next.width ||
      prev.height !== next.height
        ? next
        : prev,
    );
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const on = () => measure();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [measure]);

  const ctx = useMemo<LayerContext>(() => ({ getLocalPoint, register }), [getLocalPoint, register]);

  return (
    <div ref={hostRef} className={["relative", className].join(" ")}>
      <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
      <svg
        key={renderTick}
        className={["pointer-events-none absolute inset-0 z-[1]", hideOnMobile ? "hidden md:block" : ""].join(" ")}
        width="100%"
        height="100%"
        viewBox={rect ? `0 0 ${rect.width} ${rect.height}` : "0 0 100 100"}
        preserveAspectRatio="none"
        aria-hidden
      >
        {renderersRef.current.map((r, i) => (
          <g key={i}>{r()}</g>
        ))}
      </svg>
    </div>
  );
}
