import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = {};

export default function ScrollRestoration() {
  const { pathname, key, hash } = useLocation();

  useEffect(() => {
    // Save scroll position when leaving a page
    const handleScroll = () => {
      scrollPositions[key] = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [key]);

  useEffect(() => {
    // If a hash is present, scroll to that element; otherwise restore or reset to top
    if (hash) {
      const target = document.getElementById(hash.replace("#", ""));
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    if (scrollPositions[key] !== undefined) {
      window.scrollTo(0, scrollPositions[key]);
    } else {
      window.scrollTo(0, 0);
    }
  }, [key, hash]);

  return null;
}