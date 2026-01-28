"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme";

export default function ThemeChanger() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);

    const initialTheme: "light" | "dark" =
      stored === "light" || stored === "dark" ? stored : "dark";

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme-mode", initialTheme);
    localStorage.setItem(THEME_KEY, initialTheme);
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme-mode", newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  if (theme === null) {
    return null;
  }

  return (
    <button type="button" className="theme-switcher" onClick={toggleTheme}>
      <i
        suppressHydrationWarning
        id="theme-button"
        className={`change-theme ${theme === "dark" ? "ri-sun-line" : "ri-moon-line"}`}
      />
    </button>
  );
}
