"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  BlurIn,
} from "./motion";

// Animated Profile Picture
export function AnimatedProfilePic({ src, alt }) {
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <motion.div
        className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-700 shadow-xl shadow-sky-900/10 dark:shadow-black/30"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={alt}
          width={144}
          height={144}
          className="w-full h-full object-cover"
          priority
        />
      </motion.div>
      {/* Decorative ring with animation */}
      <motion.div
        className="absolute -inset-1 rounded-full border-2 border-sky-200/50 dark:border-sky-500/30 -z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      {/* Pulse effect */}
      <motion.div
        className="absolute -inset-2 rounded-full border border-sky-300/30 dark:border-sky-500/20 -z-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Animated Name
export function AnimatedName({ firstName, lastName }) {
  return (
    <motion.h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-sky-950 dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {firstName}{" "}
      </motion.span>
      <motion.span
        className="font-semibold"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {lastName}
      </motion.span>
    </motion.h1>
  );
}

// Animated Job Title
export function AnimatedJobTitle({ titles }) {
  return (
    <motion.p
      className="text-xs sm:text-sm md:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase text-sky-600 dark:text-sky-400 font-medium leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {titles.map((title, index) => (
        <motion.span
          key={index}
          className={index > 0 ? "block" : ""}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 + index * 0.15 }}
        >
          {title}
          {index < titles.length - 1 && <br />}
        </motion.span>
      ))}
    </motion.p>
  );
}

// Animated Contact Icons (Mobile)
export function AnimatedContactIcons({ children }) {
  return (
    <StaggerContainer className="flex md:hidden justify-center gap-3" staggerDelay={0.1}>
      {children}
    </StaggerContainer>
  );
}

// Animated Contact Icon Button
export function AnimatedContactIconButton({ icon, href, target, label }) {
  const ButtonContent = (
    <motion.div
      className="flex flex-col items-center gap-1.5"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <motion.div
        className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-700/80 border border-sky-200/50 dark:border-slate-600/50 shadow-sm flex items-center justify-center text-sky-600 dark:text-sky-400"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
        {label}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {ButtonContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {ButtonContent}
    </motion.div>
  );
}

// Animated Skills
export function AnimatedSkills({ skills }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap gap-2"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {skills.map((skill) => (
        <motion.div
          key={skill}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 10 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Badge
            variant="secondary"
            className="bg-white/80 dark:bg-slate-700/80 text-sky-800 dark:text-sky-300 hover:bg-white dark:hover:bg-slate-600 border-sky-200/50 dark:border-slate-600/50 font-medium px-3 py-1.5 shadow-sm cursor-default"
          >
            {skill}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Animated Experience Card
export function AnimatedExperienceCard({ children, index = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ x: 5 }}
    >
      {children}
    </motion.div>
  );
}

// Animated Section Title
export function AnimatedSectionTitle({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

