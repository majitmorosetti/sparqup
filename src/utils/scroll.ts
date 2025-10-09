// SSR-safe helpers
export const isScrollableY = (el: Element | null): el is HTMLElement => {
  if (typeof window === "undefined") return false;
  if (!el || !(el instanceof HTMLElement)) return false;
  const cs = window.getComputedStyle(el);
  if (!/(auto|scroll)/.test(cs.overflowY)) return false;
  return el.scrollHeight > el.clientHeight + 1;
};

export function hasScrollableAncestorInDirection(
  start: EventTarget | null,
  deltaY: number,
): boolean {
  if (typeof window === "undefined") return false;

  const up = deltaY < 0;
  let el: HTMLElement | null =
    start instanceof HTMLElement
      ? start
      : start instanceof Element
        ? (start as HTMLElement)
        : null;

  while (el && el !== document.body && el !== document.documentElement) {
    const cs = window.getComputedStyle(el);
    const canScrollY = /(auto|scroll)/.test(cs.overflowY);
    if (canScrollY) {
      const canUp = el.scrollTop > 0;
      const canDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
      if ((up && canUp) || (!up && canDown)) return true;
    }
    el = el.parentElement;
  }
  return false;
}

/** Optionnel : détection de support CSS Scroll-Driven Animations, sans `any` */
export const supportsScrollTimeline = (): boolean => {
  if (typeof CSS === "undefined") return false;
  if (typeof CSS.supports !== "function") return false;
  return (
    CSS.supports("animation-timeline: scroll()") ||
    CSS.supports("animation-timeline: scroll(root block)")
  );
};
