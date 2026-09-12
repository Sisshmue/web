"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { usePortfolioTheme } from "@/context/ThemeContext";

type HeroProps = {
  profile: {
    name?: string | null;
    title?: string | null;
    focus?: string | null;
    headline?: string | null;
    bio?: string | null;
    heroChips?: string[] | null;
    profileImage?: {
      asset?: any;
      alt?: string | null;
    } | null;
    secondaryProfileImage?: {
      asset?: any;
      alt?: string | null;
    } | null;
  } | null;
};

/**
 * Animated Letter "I" in SISS:
 * Crafted as an inline vector SVG glyph with hardware-accelerated GPU animations.
 * Completely immune to mobile WebKit timer throttling and layer-caching bugs.
 * Starts 1s after render, active for 3s (stem drops to lowercase "i", upper dot morphs into black eye looking around),
 * rests for 1s as a bold capital "I", and repeats in a continuous infinite loop.
 */
function AnimatedI() {
  return (
    <span
      className="inline-block relative h-[0.76em] w-[0.24em] mx-[0.015em] align-baseline select-none overflow-visible will-change-transform"
      style={{
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
      aria-label="I"
    >
      <svg
        viewBox="0 0 24 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Upper Eye Group: morphs in/out with sissEyeCycle */}
        <g className="animate-siss-eye-group">
          {/* Outer Eye Almond/Oval: White fill with bold black stroke */}
          <ellipse
            cx="12"
            cy="11"
            rx="11.5"
            ry="7.5"
            fill="#ffffff"
            stroke="#0a0a0c"
            strokeWidth="2.8"
          />

          {/* Eye Pupil looking around */}
          <circle
            cx="12"
            cy="11"
            r="3.4"
            fill="#0a0a0c"
            className="animate-siss-pupil"
          />
        </g>

        {/* Stem of the I: full height in capital state, drops down in lowercase state */}
        <rect
          x="3.2"
          y="0"
          width="17.6"
          height="76"
          rx="2.5"
          fill="#0a0a0c"
          className="animate-siss-stem"
        />
      </svg>
    </span>
  );
}

export default function HeroSection({ profile }: HeroProps) {
  const { isFlipped, toggleTheme } = usePortfolioTheme();
  const profileImgUrl = profile?.profileImage?.asset
    ? urlFor(profile.profileImage).width(600).height(600).url()
    : null;
  const secondaryImgUrl = profile?.secondaryProfileImage?.asset
    ? urlFor(profile.secondaryProfileImage).width(600).height(600).url()
    : null;

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    toggleTheme({ x, y });
  };

  const chips = (
    profile?.heroChips?.filter(Boolean) || [
      "Flutter",
      "Node.js",
      "TypeScript",
      "Agentic AI",
    ]
  ).slice(0, 4);
  const fullBio =
    profile?.bio ||
    "Engineering high-performance production applications across Flutter mobile, TypeScript/Node.js backends, and intelligent AI automation workflows.";
  const thesis = fullBio.split(/(?<=\.)\s/)[0];

  return (
    <section className="relative min-h-[90svh] sm:h-[100svh] sm:min-h-[600px] w-full flex flex-col justify-between px-6 py-6 sm:px-12 sm:py-8 bg-white overflow-hidden hero-section-wrap">
      <div className="hero-grid" aria-hidden />

      <div className="pt-12 sm:pt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0055ff] animate-pulse"></span>
          <span>Bangkok, Thailand</span>
        </div>
        <div>
          {profile?.title || "Software Engineer"}{" "}
          {profile?.focus ? `// ${profile.focus}` : "// Full-Stack & Mobile"}
        </div>
      </div>

      {/* Center: DOMINANT OVERSIZED TYPOGRAPHIC HERO WITH ANIMATED CHARACTERS */}
      <div className="my-auto py-4 sm:py-6 flex flex-col items-start justify-center select-none w-full">
        <h1 className="w-full font-extrabold uppercase tracking-[-0.05em] leading-[0.88] text-[13vw] sm:text-[11vw] lg:text-[11vw]">
          {/* Row 1: SISS HMUE */}
          <div className="py-1 flex items-baseline">
            <span className="block animate-text-reveal text-[#0a0a0c]">
              <span>S</span>
              {/* Animated "I" in SISS */}
              <AnimatedI />
              <span>SS</span>

              {/* Space between SISS and HMUE */}
              <span className="inline-block w-[0.28ch]"></span>

              <span>HMUE</span>
            </span>
          </div>

          {/* Row 2: AUNG */}
          <div className="overflow-hidden py-1 flex items-baseline">
            <span className="block animate-text-reveal [animation-delay:150ms] text-slate-400 hover:text-[#0a0a0c] transition-colors duration-300">
              <span>AUNG</span>

              {/* Rotating geometric sparkle accent */}
              <span
                data-cursor="Hi"
                className="inline-block text-[0.38em] align-top text-[#0055ff] ml-3 animate-spin-slow hover:scale-125 transition-transform select-none"
              >
                ✦
              </span>
            </span>
          </div>
        </h1>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          {profileImgUrl && (
            <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 relative z-30">
              {/* Avatar 3D Coin with exact dimensions so refresh button stays snug on mobile */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 [perspective:1000px]">
                <button
                  type="button"
                  data-cursor="Flip"
                  onClick={handleAvatarClick}
                  className="w-full h-full rounded-full cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95 group"
                  aria-label={
                    isFlipped
                      ? "Flip to primary profile picture"
                      : "Flip to alternate profile picture and warm theme"
                  }
                >
                  {/* 3D Flipping Coin Body with upside-down (rotateX) flip */}
                  <div
                    className="w-full h-full rounded-full relative transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-md group-hover:shadow-xl ring-2 ring-[#0055ff]/30 hover:ring-[#0055ff] transition-all"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateX(180deg) scale(1.08)"
                        : "rotateX(0deg) scale(1)",
                    }}
                  >
                    {/* Front Face: Primary Profile Pic */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-2 border-slate-200 bg-white"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(0deg) translateZ(1px)",
                      }}
                    >
                      <Image
                        src={profileImgUrl}
                        alt={
                          profile?.profileImage?.alt ||
                          profile?.name ||
                          "Primary Profile Picture"
                        }
                        fill
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#feb55c]/60 pointer-events-none" />
                    </div>

                    {/* Back Face: Secondary Profile Pic (Alternate View, upright on rotateX) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-2 border-[#0a0a0c] bg-white"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(180deg) translateZ(1px)",
                      }}
                    >
                      <Image
                        src={secondaryImgUrl || profileImgUrl}
                        alt={
                          profile?.secondaryProfileImage?.alt ||
                          "Alternate Profile Picture"
                        }
                        fill
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#0055ff]/40 pointer-events-none" />
                    </div>
                  </div>
                </button>

                {/* Refresh arrow icon pinned SNUGLY to bottom-right curve of avatar */}
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  data-cursor="Flip"
                  title="Tap to flip & toggle theme"
                  className="absolute -bottom-1 -right-1 z-10 h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-[#0a0a0c] text-white text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-110 active:scale-90 cursor-pointer"
                >
                  <span
                    className={`inline-block transition-transform duration-500 ${isFlipped ? "rotate-180 text-[#feb55c]" : "text-white"}`}
                  >
                    ↻
                  </span>
                </button>
              </div>

              {/* Playful Curly Arrow & "Click me!" Badge */}
              <button
                type="button"
                onClick={handleAvatarClick}
                data-cursor="Flip"
                title="Tap to flip profile & theme"
                className="group/callout flex items-center gap-1.5 py-1 px-1 cursor-pointer select-none text-left focus:outline-none animate-bounce-subtle"
              >
                {/* Hand-drawn Curly Arrow pointing LEFT towards the avatar */}
                <svg
                  width="34"
                  height="24"
                  viewBox="0 0 34 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-[#0055ff] group-hover/callout:translate-x-[-2px] transition-transform duration-200"
                >
                  {/* Expressive hand-drawn curly swirl pointing left */}
                  <path
                    d="M32 17C27 21 19 22 14 18C9 14 9 7 15 5C20 3 23 9 18 12C12 15 6 11 3 9"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Arrowhead pointing towards the avatar (left) */}
                  <path
                    d="M8 5L2 9L6 15"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Playful Pill Badge */}
                <span className="font-heading font-extrabold text-[11px] sm:text-xs tracking-wider uppercase bg-[#0a0a0c] text-[#feb55c] px-3 py-1 rounded-full shadow-sm border border-[#feb55c]/50 group-hover/callout:bg-[#0055ff] group-hover/callout:text-white transition-colors duration-200 whitespace-nowrap rotate-[-2deg]">
                  {isFlipped ? "Flip back! ↺" : "Click me! ✦"}
                </span>
              </button>
            </div>
          )}

          <div className="space-y-1.5 sm:space-y-2">
            <p className="max-w-xl text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              {thesis}
            </p>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider">
              {chips.map((chip, i) => (
                <span key={chip} className="inline-flex items-center gap-2">
                  {i > 0 && <span>•</span>}
                  <span>{chip}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400 border-t border-slate-200 pt-4">
        <div>Available for hire globally</div>
        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href="#experience"
            data-cursor="Go"
            className="text-slate-600 hover:text-[#0055ff] transition-colors flex items-center gap-1.5 group font-medium"
          >
            <span>Experience</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <a
            href="#projects"
            data-cursor="Go"
            className="text-[#0055ff] hover:text-[#0a0a0c] transition-colors flex items-center gap-1.5 group font-medium"
          >
            <span>Works</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
