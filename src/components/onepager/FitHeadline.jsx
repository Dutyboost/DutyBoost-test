import { useLayoutEffect, useRef, useState } from "react";

/**
 * One-pager headline that always stays on a single line:
 * the font size starts at maxSize and shrinks until the text fits the container width.
 */
export default function FitHeadline({ text, maxSize = 16, minSize = 9, className = "" }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [size, setSize] = useState(maxSize);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const el = textRef.current;
    if (!container || !el) return;
    let current = maxSize;
    el.style.fontSize = `${current}px`;
    while (el.scrollWidth > container.clientWidth && current > minSize) {
      current -= 0.25;
      el.style.fontSize = `${current}px`;
    }
    setSize(current);
  }, [text, maxSize, minSize]);

  return (
    <div ref={containerRef} className={className}>
      <h1 ref={textRef} className="font-heading font-bold leading-tight whitespace-nowrap" style={{ fontSize: `${size}px` }}>
        {text}
      </h1>
    </div>
  );
}