"use client";

import Image from "next/image";
import { useRef } from "react";
import { Parrot } from "@/components/hero/Parrot";
import { Sky } from "@/components/hero/Sky";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/PCollinx",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-.9 2.6V22",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/collins-paul-60006b19b/",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/twiceatwt",
    path: "M4 4l16 16M20 4L4 20",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLSpanElement>(null);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero relative isolate overflow-hidden bg-[#CFE6F6] text-[#12263A] dark:bg-[#0E1726] dark:text-[#E8EEF6]"
    >
      <Sky />
      <Parrot containerRef={sectionRef} avatarRef={avatarRef} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-5 pb-28 pt-28 md:min-h-[900px] md:px-0 md:pb-40 md:pt-32">
        <div className="flex items-center gap-3">
          <span
            ref={avatarRef}
            className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white md:h-[52px] md:w-[52px] dark:border-[#2C3D57]"
          >
            <Image
              src="/profile.jpeg"
              alt="Portrait of Collins"
              fill
              sizes="52px"
              className="object-cover"
              priority
            />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2E4A61] md:text-[15px] dark:text-[#B7C4D6]">
            <span className="hidden md:inline">Collins Paul · </span>Mobile &amp; frontend developer
          </p>
        </div>

        <h1 className="font-display mt-5 max-w-[920px] text-[42px] font-medium leading-[1.08] md:mt-6 md:text-[84px] md:leading-[1.03]">
          I build apps people actually use, on the phone and on the web.
        </h1>

        <p className="mt-5 max-w-[640px] text-base leading-relaxed text-[#2E4A61] md:mt-6 md:text-xl dark:text-[#B7C4D6]">
          Lead mobile developer at eCampusMart, shipping React Native, Expo, React and
          Next.js products with payments, real-time chat and a systems-first approach.
        </p>

        <div className="mt-7 flex flex-col gap-3 md:mt-8 md:flex-row md:items-center md:gap-4">
          <a
            href="#projects"
            className="rounded-full bg-[#B4461A] px-6 py-[15px] text-center font-semibold text-white transition-colors hover:bg-[#8A3412] dark:bg-[#FF9B6E] dark:text-[#0E1726] dark:hover:bg-[#FFC2A6]"
          >
            See my work
          </a>
          <a
            href="/cv.pdf"
            download
            className="rounded-full border border-[#B9CFE0] bg-white px-6 py-[15px] text-center font-semibold text-[#12263A] transition-colors hover:border-[#12263A] dark:border-[#3A4D6A] dark:bg-transparent dark:text-[#E8EEF6] dark:hover:border-[#E8EEF6]"
          >
            Download CV
          </a>
          <div className="flex justify-center gap-1 md:ml-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#12263A] transition-colors hover:bg-[#FFFFFF99] dark:text-[#C9D4E2] dark:hover:bg-[#FFFFFF1A]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="sky-cue absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[13px] font-medium text-[#2E4A61] md:flex dark:text-[#B7C4D6]"
      >
        Scroll
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
