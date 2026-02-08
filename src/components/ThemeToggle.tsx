"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, Theme } from "@/context/ThemeContext";

const themeIcons: Record<Theme, string> = {
  light: "☀️",
  dark: "🌙",
  cupcake: "🧁",
  bumblebee: "🐝",
  synthwave: "🎹",
  dracula: "🧛",
};

const themeNames: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  cupcake: "Cupcake",
  bumblebee: "Bumblebee",
  synthwave: "Synthwave",
  dracula: "Dracula",
};

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        <span className="text-xl">{themeIcons[theme]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
          <div className="py-2">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Theme
            </p>
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === t
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span>{themeIcons[t]}</span>
                <span className="font-medium">{themeNames[t]}</span>
                {theme === t && (
                  <svg
                    className="w-4 h-4 ml-auto text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
