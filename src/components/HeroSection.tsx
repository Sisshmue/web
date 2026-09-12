"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/image";

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
  const profileImgUrl = profile?.profileImage?.asset
    ? urlFor(profile.profileImage).width(600).height(600).url()
    : null;
  const chips = (profile?.heroChips?.filter(Boolean) || ["Flutter", "Node.js", "TypeScript", "Agentic AI"]).slice(
    0,
    4
  );
  const fullBio =
    profile?.bio ||
    "Engineering high-performance production applications across Flutter mobile, TypeScript/Node.js backends, and intelligent AI automation workflows.";
  const thesis = fullBio.split(/(?<=\.)\s/)[0];

  return (
    <section className="relative min-h-[90svh] sm:h-[100svh] sm:min-h-[600px] w-full flex flex-col justify-between px-6 py-6 sm:px-12 sm:py-8 bg-white overflow-hidden">
      <div className="hero-grid" aria-hidden />

      <div className="pt-12 sm:pt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0055ff] animate-pulse"></span>
          <span>Bangkok, Thailand</span>
        </div>
        <div>{profile?.title || "Software Engineer"} {profile?.focus ? `// ${profile.focus}` : "// Full-Stack & Mobile"}</div>
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
            <button
              type="button"
              data-cursor="About"
              onClick={() => window.dispatchEvent(new Event("portfolio:open-about"))}
              className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-slate-200 shrink-0 shadow-md animate-float-slow hover:rotate-[-8deg] hover:scale-110 transition-transform duration-300"
              aria-label="Open about"
            >
              <Image
                src={profileImgUrl}
                alt={profile?.name || "Siss Hmue Aung"}
                fill
                priority
                className="object-cover"
              />
            </button>
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
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href="#projects"
            data-cursor="Go"
            className="text-[#0055ff] hover:text-[#0a0a0c] transition-colors flex items-center gap-1.5 group font-medium"
          >
            <span>Works</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
