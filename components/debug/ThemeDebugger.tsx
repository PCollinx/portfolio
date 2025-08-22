"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDebugger() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 p-4 bg-gray-200 rounded-lg">
        Loading theme...
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg text-sm">
      <div className="font-bold mb-2 text-gray-900 dark:text-white">Theme Debug</div>
      <div className="space-y-1 text-gray-700 dark:text-gray-300">
        <div>Theme: {theme}</div>
        <div>Resolved: {resolvedTheme}</div>
        <div>System: {systemTheme}</div>
        <div>HTML Classes: {document.documentElement.className}</div>
      </div>
      <div className="mt-3 space-x-2">
        <button
          onClick={() => setTheme('light')}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-xs"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="px-3 py-1 bg-gray-800 text-white rounded text-xs"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
        >
          System
        </button>
      </div>
      <div className="mt-2 w-full h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
        This should change color in dark mode
      </div>
    </div>
  );
}
