import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = {};

export default function ScrollRestoration() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    // Save scroll position when leaving a page
    const handleScroll = () => {
      scrollPositions[key] = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [key]);

  useEffect(() => {
    // Restore scroll position on navigation
    if (scrollPositions[key] !== undefined) {
      window.scrollTo(0, scrollPositions[key]);
    } else {
      window.scrollTo(0, 0);
    }
  }, [key]);

  return null;
}