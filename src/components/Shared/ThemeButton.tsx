"use client";
import { useTheme } from "next-themes";
import React, { useCallback } from "react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const handleClick = useCallback(() => {
    theme?.includes("girl") ? setTheme("boy") : setTheme("girl");
  }, [theme, setTheme]);
  return (
    <button
      onClick={handleClick}
      className="absolute bottom-32 rounded-lg bg-gray-800 px-8 py-2 text-2xl text-gender-accent transition-all duration-100 hover:bg-gray-600 dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-gray-300 md:text-4xl"
    >
      Toggle Mode
    </button>
  );
}
