
import { useEffect, useState } from "react";


export default function useScrollSpy(sectionIds, rootMarginTop = 0) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
       
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: `-${rootMarginTop}px 0px -55% 0px`,
        threshold: [0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMarginTop]);

  return activeId;
}
