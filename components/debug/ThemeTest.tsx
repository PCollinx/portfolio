"use client";

import { useState, useEffect } from "react";

export function ThemeTest() {
  const [mounted, setMounted] = useState(false);
  const [themeState, setThemeState] = useState("unknown");

  useEffect(() => {
    setMounted(true);
    checkThemeState();
  }, []);

  const checkThemeState = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
  };

  if (!mounted) return null;

  const toggleClass = () => {
    document.documentElement.classList.toggle("dark");
    console.log("HTML classes:", document.documentElement.className);
    checkThemeState();
  };

  const forceRefresh = () => {
    // Force a complete style recalculation
    const style = document.createElement("style");
    style.textContent = "* { transform: translateZ(0); }";
    document.head.appendChild(style);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1);
  };

  return (
    <div className="fixed top-4 right-4 p-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
      <div className="text-black dark:text-white mb-2 font-bold">
        Theme Test Component
      </div>
      <div className="mb-2 text-sm">
        Current state: <span className="font-mono">{themeState}</span>
      </div>
      <div className="dark-mode-test w-8 h-8 mb-2 border border-gray-400"></div>
      <div className="space-y-2">
        <button
          onClick={toggleClass}
          className="block w-full px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Toggle Dark Class
        </button>
        <button
          onClick={forceRefresh}
          className="block w-full px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded hover:bg-green-600 dark:hover:bg-green-800"
        >
          Force Refresh
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Red square = Light mode
        <br />
        Blue square = Dark mode
      </div>
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
        <div>Test element should change from gray to dark gray</div>
      </div>
    </div>
  );
}
