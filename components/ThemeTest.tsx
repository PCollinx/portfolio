"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeTest() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlClass, setHtmlClass] = useState("");

  useEffect(() => {
    setMounted(true);
    
    // Check the actual HTML class
    const observer = new MutationObserver(() => {
      setHtmlClass(document.documentElement.className);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    setHtmlClass(document.documentElement.className);
    
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded text-sm">
      <div>Current theme: {theme}</div>
      <div>HTML class: &quot;{htmlClass}&quot;</div>
      <div className="mt-2 space-x-2">
        <button 
          onClick={() => setTheme("light")}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Light
        </button>
        <button 
          onClick={() => setTheme("dark")}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Dark
        </button>
      </div>
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        This should change color with theme
      </div>
    </div>
  );
}
