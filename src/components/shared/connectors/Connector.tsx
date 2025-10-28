"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type ReactElement,
} from "react";
import { useConnectorLayer } from "./ConnectorLayer";

type P = { x: number; y: number };

type Props = {
  fromRef: RefObject<HTMLElement | null> | React.MutableRefObject<HTMLElement | null>;
  toRef:   RefObject<HTMLElement | null> | React.MutableRefObject<HTMLElement | null>;
  curvature?: number;     // 0..1
  biasY?: number;         // -1..1
  className?: string;     // teinte de la ligne (sera mélangée avec screen)
  strokeW?: number;       // épaisseur de base
  attach?: "right-left" | "bottom-top";
  /** active le photon si progress défini */
  pulse?: boolean;
  /** progress externe 0..1 (photon visible seulement sur le connector “actif”) */
  progress?: number | null;
  /** mode diag */
  debug?: boolean;
};


export default function Connector({
  fromRef,
  toRef,
  curvature = 0.35,
  biasY = 0,
  className = "text-foreground/45",
  strokeW = 2,
  attach = "right-left",
  pulse = true,
  progress = null,
  debug = false,
}: Props): ReactElement | null {
  const { getLocalPoint, register } = useConnectorLayer();
  const [pathD, setPathD] = useState<string | null>(null);
  const [len, setLen] = useState<number>(0);
  const geomRef = useRef<{ p0: P; p1: P; p2: P; p3: P } | null>(null);

  // calcule la géométrie et le d de la path
  useEffect(() => {
    const a = fromRef.current;
    const b = toRef.current;
    if (!a || !b) return;

    const compute = () => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      let p0: P, p1: P, p2: P, p3: P;
      if (attach === "bottom-top") {
        const aMidX = ar.left + ar.width / 2;
        const bMidX = br.left + br.width / 2;
        p0 = getLocalPoint({ x: aMidX, y: ar.bottom });
        p3 = getLocalPoint({ x: bMidX, y: br.top });
        const dy = Math.max(32, Math.abs(p3.y - p0.y));
        const cx = (p0.x + p3.x) / 2;
        const bias = biasY * Math.abs(p3.x - p0.x) * 0.5;
        p1 = { x: cx + bias, y: p0.y + dy * curvature };
        p2 = { x: cx - bias, y: p3.y - dy * curvature };
      } else {
        p0 = getLocalPoint({ x: ar.right, y: ar.top + ar.height / 2 });
        p3 = getLocalPoint({ x: br.left, y: br.top + br.height / 2 });
        const dx = Math.max(24, Math.abs(p3.x - p0.x));
        const cy = (p0.y + p3.y) / 2 + biasY * Math.abs(p3.y - p0.y) * 0.5;
        p1 = { x: p0.x + dx * curvature, y: cy };
        p2 = { x: p3.x - dx * curvature, y: cy };
      }

      geomRef.current = { p0, p1, p2, p3 };
      const d = `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`;
      setPathD(d);
    };

    compute();

    const roA = new ResizeObserver(() => compute());
    const roB = new ResizeObserver(() => compute());
    roA.observe(a);
    roB.observe(b);
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });

    return () => {
      roA.disconnect();
      roB.disconnect();
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [fromRef, toRef, getLocalPoint, curvature, biasY, attach]);

  // renderer inscrit dans le layer
  const measureRef = useRef<SVGPathElement | null>(null);
  const rendererRef = useRef<() => ReactElement | null>(() => null);

  useEffect(() => register(() => rendererRef.current()), [register]);

  // Met à jour la longueur quand pathD change
  useEffect(() => {
    if (!measureRef.current) return;
    try {
      const L = measureRef.current.getTotalLength();
      if (L && L !== len) setLen(L);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathD]);

  rendererRef.current = () => {
    if (!pathD) return null;

    // point “photon” contrôlé par progress (0..1)
    const hasProgress = progress !== null && progress !== undefined;
    const showPhoton = !!pulse && !!hasProgress && len > 0 && (progress as number) >= 0 && (progress as number) <= 1;
    let cx = 0, cy = 0;
    if (showPhoton && measureRef.current) {
      const L = len * (progress as number);
      const pt = measureRef.current.getPointAtLength(L);
      cx = pt.x; cy = pt.y;
    }

    return (
      <g className={className} style={{ mixBlendMode: "screen" }}>
        {/* path caché pour mesurer la longueur */}
        <path ref={measureRef} d={pathD} fill="none" stroke="transparent" strokeWidth={1} />

        {debug && geomRef.current ? (
          <>
            <circle cx={geomRef.current.p0.x} cy={geomRef.current.p0.y} r={3} fill="lime" />
            <circle cx={geomRef.current.p3.x} cy={geomRef.current.p3.y} r={3} fill="red" />
          </>
        ) : null}

        {/* ligne de base (couleur du composant) */}
        <path d={pathD} fill="none" stroke="currentColor" strokeWidth={strokeW} strokeLinecap="round" opacity={0.75} />

        {/* highlight doux autour de la fibre */}
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeW + 1.6}
          strokeLinecap="round"
          opacity={0.22}
          style={{ filter: "blur(2px) drop-shadow(0 0 10px var(--halo))" }}
        />

{/* PHOTON — cœur blanc + halo violet au même point */}
       {showPhoton && (
          <>
            {/* Halo violet (plus large, blur) */}
            <circle
              cx={cx}
              cy={cy}
              r={strokeW * 3}
              fill="#a855f7"     /* violet-500 */
              opacity={0.35}
              style={{ filter: "blur(8px) drop-shadow(0 0 18px var(--halo))", mixBlendMode: "screen" }}
            />
            {/* Cœur blanc, très concentré */}
            <circle
              cx={cx}
              cy={cy}
              r={strokeW * 0.9}
              fill="#ffffff"
              opacity={0.98}
              style={{ mixBlendMode: "screen" }}
            />
          </>
        )}
      </g>
    );
  };

  return null;
}
