"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function ThemeButton() {
  const { theme, toggleTheme, mounted } = useTheme();
  const dark = mounted && theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B9CFE0] bg-white text-[#12263A] transition-colors hover:border-[#12263A] dark:border-[#2C3D57] dark:bg-[#162236] dark:text-[#F3E9D2] dark:hover:border-[#F3E9D2]"
    >
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
      )}
    </button>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-[#DCE8F1] bg-[#F7FBFE]/90 backdrop-blur dark:border-[#1C2A40] dark:bg-[#0E1726]/90"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-0 md:py-7">
        <a href="#home" className="font-display text-[22px] font-semibold text-[#12263A] md:text-2xl dark:text-[#E8EEF6]">
          Collins
        </a>

        <div className="flex items-center gap-2">
          <nav aria-label="Main" className="hidden items-center gap-2 text-[15px] font-medium md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="px-3.5 py-2.5 transition-opacity hover:opacity-70">
                {l.label}
              </a>
            ))}
          </nav>
          <span className="md:ml-2">
            <ThemeButton />
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B9CFE0] bg-white text-[#12263A] md:hidden dark:border-[#2C3D57] dark:bg-[#162236] dark:text-[#E8EEF6]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="px-5 pb-5 md:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[#DCE8F1] py-3.5 text-lg font-medium dark:border-[#1C2A40]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
