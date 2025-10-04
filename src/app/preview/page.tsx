// src/app/preview/page.tsx
import ResponsivePreview from "@/components/preview/ResponsivePreview";

export default function Page() {
  return (
    <div className="px-4 py-8">
      <ResponsivePreview
        maxWidth={1100}
        maxVh={70}
        transitionSec={0.7}
        pauseSec={2.0}
        overshoot={1.03}
        showLabel
      />
    </div>
  );
}
