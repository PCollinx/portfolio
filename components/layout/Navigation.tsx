"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const mobileBackdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileLinkVariants = {
    closed: {
      x: -20,
      opacity: 0,
    },
    open: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-transparent"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 w-full max-w-[1200px]">
        <div className="flex items-center justify-between w-full">
          <motion.div variants={logoVariants} whileHover="hover">
            <Link
              href="#home"
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-[#447D9B] dark:hover:text-[#FE7743] transition-colors"
            >
              Collins
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={linkVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1 + 0.3,
                    duration: 0.5,
                  },
                }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#447D9B] dark:hover:text-[#FE7743] transition-colors font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors relative z-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  className="w-6 h-0.5 text-gray-900 dark:bg-gray-300 block rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 text-gray-900 dark:bg-gray-300 block mt-1.5 rounded-full"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 text-gray-900 dark:bg-gray-300 block mt-1.5 rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Mobile Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                variants={mobileBackdropVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ top: 0, zIndex: -1 }}
              />

              {/* Mobile Menu Content */}
              <motion.div
                className="md:hidden absolute left-0 right-0 top-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ overflow: "hidden" }}
              >
                <div className="container mx-auto px-6">
                  <div className="py-6 space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        variants={mobileLinkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        custom={index}
                      >
                        <Link
                          href={item.href}
                          className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-[#447D9B] dark:hover:text-[#FE7743] hover:bg-[#D7D7D7]/30 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium text-lg group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.label}</span>
                            <motion.div
                              className="w-0 group-hover:w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-200"
                              whileHover={{ scale: 1.2 }}
                            />
                          </div>
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile CTA Section */}
                    <motion.div
                      className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <Link
                        href="#contact"
                        className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-center font-semibold rounded-xl transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get In Touch
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
