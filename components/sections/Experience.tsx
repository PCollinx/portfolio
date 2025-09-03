"use client";

import { motion } from "framer-motion";

export function Experience() {
  const experiences = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Mokohost.",
      period: "2024 - Present",
      description:
        "Leading frontend development for multiple client projects, and implementing modern development practices.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led migration from JavaScript to TypeScript across 3 major projects",
      ],
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Junior Frontend Developer",
      company: "StartUp Ventures",
      period: "2023 - 2024",
      description:
        "Started my professional journey focusing on learning modern web technologies and building user interfaces.",
      achievements: [
        "Developed responsive components for the main product",
        "Participated in daily standups and sprint planning",
        "Learned modern development workflows and best practices",
      ],
      tech: ["JavaScript", "React", "CSS3", "Git"],
    },
    {
      id: 3,
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2021 - 2023",
      description:
        "Built websites for local businesses while learning web development fundamentals.",
      achievements: [
        "Completed 15+ client projects",
        "Learned HTML, CSS, and JavaScript fundamentals",
        "Built first React applications",
      ],
      tech: ["HTML", "CSS", "JavaScript", "WordPress"],
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

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="py-20 px-6 bg-white">
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
            Experience & Journey
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
            My professional journey and the milestones that shaped my career
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Experience Timeline */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Timeline Line */}
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative flex items-start mb-12"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: index * 0.2 + 0.7,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2 }}
                />

                {/* Content */}
                <motion.div
                  className="ml-20 bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full border border-gray-100"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-gray-500 font-medium mt-2 lg:mt-0 bg-white px-3 py-1 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          className="flex items-start text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + achievementIndex * 0.1 + 1,
                            duration: 0.4,
                          }}
                          viewport={{ once: true }}
                        >
                          <span className="text-blue-600 mr-3 mt-1.5 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + techIndex * 0.05 + 1.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.1 }}
                        viewport={{ once: true }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
