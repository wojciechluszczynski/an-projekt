import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    document.addEventListener("mousemove", move);

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent transition-all duration-150 ease-out ${
        hovering ? "w-10 h-10 bg-accent/20" : "w-5 h-5 bg-transparent"
      }`}
    />
  );
};

export default CustomCursor;
