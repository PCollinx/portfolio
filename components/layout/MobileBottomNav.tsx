"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home");

  const navItems: NavItem[] = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        href: "#home",
        icon: (
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        ),
      },
      {
        id: "skills",
        label: "Skills",
        href: "#skills",
        icon: (
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ),
      },
      {
        id: "experience",
        label: "Experience",
        href: "#experience",
        icon: (
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
            />
          </svg>
        ),
      },

      {
        id: "projects",
        label: "Projects",
        href: "#projects",
        icon: (
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        ),
      },
      {
        id: "contact",
        label: "Contact",
        href: "#contact",
        icon: (
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        ),
      },
    ],
    []
  );

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-3 sm:bottom-5 left-3 right-3 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:max-w-sm z-50 md:hidden"
    >
      <div className="relative">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl" />

        {/* Navigation Items */}
        <div className="relative flex items-center justify-between px-2 py-2.5 sm:px-4 sm:py-3">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.href, item.id)}
              className={`
                relative flex flex-col items-center justify-center
                w-11 h-12 sm:w-14 sm:h-16 md:w-16 md:h-18 rounded-lg sm:rounded-xl 
                transition-all duration-300 flex-1 max-w-[55px] sm:max-w-[65px] md:max-w-none
                ${
                  activeSection === item.id
                    ? "text-[#FE7743]"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }
              `}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Active Indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-[#D7D7D7]/80 rounded-lg sm:rounded-xl border border-[#D7D7D7] shadow-md"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon and Label */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: activeSection === item.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="mb-1 sm:mb-1.5"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                    {item.icon}
                  </div>
                </motion.div>
                <span
                  className={`
                    text-[9px] sm:text-[11px] md:text-xs font-medium transition-all duration-200
                    ${
                      activeSection === item.id
                        ? "opacity-100 scale-100"
                        : "opacity-70 scale-95"
                    }
                  `}
                >
                  {item.label}
                </span>
              </div>

              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg sm:rounded-xl bg-[#447D9B]/20"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-5 bg-[#447D9B]/30 dark:bg-[#FE7743]/20 blur-xl rounded-full" />
      </div>
    </motion.nav>
  );
}
