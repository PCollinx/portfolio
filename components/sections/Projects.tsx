"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Projects() {
  const projects = [
    {
      id: 1,
      title: "Weather App",
      description:
        "A modern weather application built with Next.js, featuring detailed weather information and a clean, responsive UI.",
      image: "/weather.png",
      tech: ["NextJS", "OpenWeather API", "Typescript", "Tailwind"],
      category: "frontend",
      github: "https://github.com/PCollinx/weather",
      demo: "https://weather-mu-green.vercel.app/",
      featured: true,
    },
    {
      id: 2,
      title: "Nexus Host",
      description:
        "NexusHost is a modern, responsive web hosting platform built with Next.js 15, Tailwind CSS, and Framer Motion.",
      image: "/nexushost.png",
      tech: ["Next.js", "Radix UI", "Framer Motion"],
      category: "frontend",
      github: "https://github.com/PCollinx/NexusHost.git",
      demo: "https://nexus-host.vercel.app",
      featured: true,
    },
    {
      id: 3,
      title: "Crown Clothing",
      description:
        "A desktop Clothing shopping app that was designed with react",
      image: "/crown-clothing.png",
      tech: ["React", "Redux", "Firebase", "Styled Component"],
      category: "fullstack",
      github: "https://github.com/PCollinx/crown-clothing-v2.git",
      demo: "https://crownclothing-2.netlify.app/",
      featured: false,
    },

    {
      id: 4,
      title: "Fitness Tracker",
      description:
        "A comprehensive fitness tracking application with workout plans, progress tracking, and social features like music playlists.",
      image: "/fitness.png",
      tech: ["React", "Next.js", "Prisma", "Chart.js"],
      category: "mobile",
      github: "https://github.com/PCollinx/fitness",
      demo: "https://fitness-jet-five.vercel.app/",
      featured: false,
    },
    {
      id: 5,
      title: "Chat Application",
      description:
        "Real-time chat application with group messaging, file sharing, and video calling capabilities.",
      image: "/api/placeholder/600/400",
      tech: ["React", "Socket.io", "WebRTC", "Express"],
      category: "fullstack",
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true,
    },
  ];

  const projectVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 px-0 sm:px-4 md:px-6 bg-white dark:bg-[#273F4F] w-full"
    >
      <div className="container mx-auto w-full max-w-[1200px]">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#447D9B] to-[#FE7743] mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A showcase of my recent work and personal projects
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full"
          layout
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white dark:bg-[#447D9B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {project.image.startsWith("/api/placeholder") ? (
                    // Fallback for placeholder images
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#273F4F] to-[#447D9B] flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white text-6xl font-bold opacity-20">
                        {project.title.charAt(0)}
                      </div>
                    </motion.div>
                  ) : (
                    // Actual project image
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  )}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 right-4 bg-[#FE7743] text-white px-3 py-1 rounded-full text-sm font-semibold"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      Featured
                    </motion.div>
                  )}
                  <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-[#D7D7D7] dark:bg-[#273F4F] text-[#273F4F] dark:text-[#D7D7D7] rounded-full text-sm font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + techIndex * 0.1 + 0.6,
                          type: "spring",
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Project Links */}
                  <motion.div
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#FE7743] dark:hover:text-[#FE7743] transition-colors"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-sm">Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#FE7743] dark:hover:text-[#FE7743] transition-colors"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            Want to see more of my work?
          </motion.p>
          <motion.a
            href="https://github.com/PCollinx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#273F4F] text-white font-semibold rounded-lg hover:bg-[#447D9B] transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
