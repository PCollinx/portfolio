"use client";

import { motion } from "framer-motion";

export function About() {
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

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8,
      },
    },
  };

  return (
    <section id="about" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
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
              About Me
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
              Passionate about creating exceptional digital experiences that make a difference
            </motion.p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.p
                className="text-lg text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                I&apos;m a passionate frontend developer with a love for
                creating beautiful, functional, and user-centered digital
                experiences. With expertise in modern JavaScript frameworks and
                a keen eye for design, I bring ideas to life through clean,
                efficient code.
              </motion.p>

              <motion.p
                className="text-lg text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                My journey in web development started with curiosity and has
                evolved into a deep passion for building applications that make
                a difference. I believe in writing code that is not only
                functional but also maintainable and scalable.
              </motion.p>

              <motion.div className="space-y-4" variants={itemVariants}>
                <h3 className="text-xl font-semibold text-gray-900">
                  What I Do
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Frontend Development",
                    "UI/UX Design",
                    "API Integration",
                    "Performance Optimization",
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-blue-600 rounded-full"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + 0.7,
                          type: "spring",
                        }}
                        viewport={{ once: true }}
                      />
                      <span className="text-gray-700">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              variants={statsVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-2xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                viewport={{ once: true }}
              >
                Quick Facts
              </motion.h3>
              <div className="space-y-4">
                {[
                  { label: "Experience", value: "3+ Years" },
                  { label: "Projects Completed", value: "50+" },
                  { label: "Technologies", value: "20+" },
                  { label: "Coffee Cups", value: "∞" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={`flex justify-between items-center py-3 ${
                      index < 3
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 1.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-gray-600">
                      {stat.label}
                    </span>
                    <motion.span
                      className="font-semibold text-gray-900 text-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 1.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
