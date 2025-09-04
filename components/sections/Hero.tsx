"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = useMemo(
    () => [
      "Frontend Developer",
      "React Specialist",
      "UI/UX Enthusiast",
      "Full Stack Developer",
    ],
    []
  );

  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Smooth typing animation effect
  useEffect(() => {
    const currentRoleText = roles[currentRole];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentRoleText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(
            currentRoleText.substring(0, displayedText.length + 1)
          );
        }, 100);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting backward
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(
            displayedText.substring(0, displayedText.length - 1)
          );
        }, 50);
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole, roles]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const socialVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.6,
      },
    },
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16 md:pb-8 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
                variants={itemVariants}
              >
                Hi, I&apos;m{" "}
                <motion.span
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Collins
                </motion.span>
              </motion.h1>

              <div className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 h-12 flex items-center">
                <span className="font-mono">
                  {displayedText}
                  <motion.span
                    className="inline-block w-0.5 h-6 bg-blue-700 ml-1"
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                  />
                </span>
              </div>
            </div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              I craft exceptional digital experiences with modern technologies.
              Specializing in React, Next.js, and TypeScript to build
              performant, scalable applications that users love.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View My Work
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                variants={buttonVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: "#3B82F6",
                  color: "#3B82F6",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            <motion.div
              className="flex items-center space-x-6 pt-8"
              variants={socialVariants}
            >
              {[
                {
                  href: "https://github.com/PCollinx",
                  icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                },
                {
                  href: "https://www.linkedin.com/in/collins-paul-60006b19b/",
                  icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  href: "https://x.com/twiceatwt",
                  icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="lg:text-right">
            <div className="relative inline-block">
              <motion.div
                className="w-80 h-80 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-2"
                variants={avatarVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/profile.jpeg"
                    alt="Collins - Frontend Developer"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-full"
                    priority
                    quality={90}
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 dark:bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
                variants={floatingIconVariants}
                animate="animate"
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
