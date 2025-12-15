"use client";
import { useEffect, useState } from "react";

export function PopupWidget() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const t = (root.dataset.theme || localStorage.getItem("theme") || "dark") as
        | "light"
        | "dark";
      setTheme(t);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true });

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const color = theme === "dark" ? "#000000" : "#ffffff";
  const bg = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div onClick={() => scrollToTop()}>
      <button
        className={`fixed bottom-6 right-6 z-[9999] text-xl rounded-ful bg-black text-white shadow-xl transition-all duration-600 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          backgroundColor: bg,
          color: color,
          borderRadius: "50%",
          padding: "0.725rem 1.075rem",
        }}
      >
        ↑
      </button>
    </div>
  );
}
