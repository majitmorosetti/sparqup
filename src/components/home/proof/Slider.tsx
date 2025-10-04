// src/components/home/proof/Slider.tsx
"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";

type Props = {
  children: ReactNode | ReactNode[]; // tolère fragment/unique
  className?: string;
  autoPlayMs?: number;
  onIndexChange?: (i: number) => void;
  pauseOnHover?: boolean;
  pauseWhenHidden?: boolean;
};

export type SliderHandle = { goTo: (i: number) => void };

export default forwardRef<SliderHandle, Props>(function Slider(
  {
    children,
    className = "",
    autoPlayMs,
    onIndexChange,
    pauseOnHover = true,
    pauseWhenHidden = true,
  },
  ref,
) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);

  const items = Array.isArray(children) ? children : [children];

  useImperativeHandle(ref, () => ({
    goTo: (i: number) => {
      const el = scrollerRef.current;
      const child = el?.children[i] as HTMLElement | undefined;
      child?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    },
  }));

  // détection de l’item centré
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0,
        bestDist = Infinity;
      const kids = Array.from(el.children) as HTMLElement[];
      kids.forEach((child, i) => {
        const c = child.offsetLeft + child.offsetWidth / 2;
        const d = Math.abs(center - c);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
      onIndexChange?.(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onIndexChange]);

  // pause au hover/focus
  useEffect(() => {
    if (!pauseOnHover) return;
    const el = scrollerRef.current;
    if (!el) return;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
    };
  }, [pauseOnHover]);

  // pause quand offscreen
  useEffect(() => {
    if (!pauseWhenHidden) return;
    const el = scrollerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? true),
      { root: null, threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pauseWhenHidden]);

  // autoplay
  useEffect(() => {
    if (!autoPlayMs) return;
    if ((pauseOnHover && hovered) || (pauseWhenHidden && !visible)) return;
    const el = scrollerRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const next = (index + 1) % items.length;
      const child = el.children[next] as HTMLElement | undefined;
      child?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [
    autoPlayMs,
    index,
    items.length,
    hovered,
    visible,
    pauseOnHover,
    pauseWhenHidden,
  ]);

  return (
    <div
      ref={scrollerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Showcases"
      aria-live="polite"
      className={[
        "flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-0",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className, // ← DOIT être présent
      ].join(" ")}
      style={{ scrollSnapType: "x mandatory" }}
    >
      {items.map((node, i) => (
        <article key={i} className="snap-center shrink-0 w-full">
          {node}
        </article>
      ))}
    </div>
  );
});
