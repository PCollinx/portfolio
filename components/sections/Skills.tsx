"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function Skills() {
  const ref = useRef(null);

  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "Next.js", level: 90, icon: "▲" },
        { name: "TypeScript", level: 88, icon: "📘" },
        { name: "JavaScript", level: 95, icon: "🟨" },
        { name: "HTML5", level: 98, icon: "🌐" },
        { name: "CSS3", level: 92, icon: "🎨" },
      ],
    },
    {
      title: "Styling & UI",
      skills: [
        { name: "Tailwind CSS", level: 90, icon: "🌊" },
        { name: "Styled Components", level: 85, icon: "💅" },
        { name: "Material-UI", level: 80, icon: "🎯" },
        { name: "Framer Motion", level: 75, icon: "🎭" },
        { name: "SCSS/Sass", level: 88, icon: "🎪" },
        { name: "CSS Modules", level: 85, icon: "📦" },
      ],
    },
    {
      title: "Backend & Tools",
      skills: [
        { name: "Node.js", level: 82, icon: "🟢" },
        { name: "Express.js", level: 78, icon: "🚂" },
        { name: "MongoDB", level: 75, icon: "🍃" },
        { name: "PostgreSQL", level: 70, icon: "🐘" },
        { name: "Git", level: 90, icon: "📝" },
        { name: "Docker", level: 65, icon: "🐳" },
      ],
    },
    {
      title: "Development Tools",
      skills: [
        { name: "VS Code", level: 95, icon: "💻" },
        { name: "Webpack", level: 75, icon: "📦" },
        { name: "Vite", level: 85, icon: "⚡" },
        { name: "Jest", level: 80, icon: "🧪" },
        { name: "Cypress", level: 72, icon: "🌲" },
        { name: "Figma", level: 85, icon: "🎨" },
      ],
    },
  ];

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

  const cardVariants = {
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
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  };

  const skillItemVariants = {
    hidden: {
      x: -20,
      opacity: 0,
    },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 px-6 bg-white"
      ref={ref}
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A comprehensive toolkit for building modern web applications
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <motion.h3
                className="text-2xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {category.title}
              </motion.h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    variants={skillItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={skillIndex}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.span
                          className="text-2xl cursor-pointer"
                          variants={iconVariants}
                          whileHover="hover"
                        >
                          {skill.icon}
                        </motion.span>
                        <span className="font-medium text-gray-900">
                          {skill.name}
                        </span>
                      </div>
                      <motion.span
                        className="text-sm font-medium text-gray-500"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: skillIndex * 0.1 + 1 }}
                        viewport={{ once: true }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        variants={skillBarVariants}
                        initial="hidden"
                        whileInView="visible"
                        custom={skill.level}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={badgeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-6 py-3 shadow-lg border border-gray-100"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-gray-600">
              Always learning:
            </span>
            <div className="flex space-x-2">
              {["Three.js", "WebGL", "GraphQL"].map((tech, index) => (
                <motion.span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    index === 0
                      ? "bg-blue-100 text-blue-800"
                      : index === 1
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 2.5 + index * 0.2,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                  }}
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
