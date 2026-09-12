"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

type Project = {
  _id: string;
  title: string | null;
  slug: { current?: string | null } | null;
  tagline?: string | null;
  coverImage?: {
    asset?: any;
    alt?: string | null;
  } | null;
  technologies?: Array<string> | null;
  siteUrl?: string | null;
  githubUrl?: string | null;
  publishedAt?: string | null;
  order?: number | null;
};

type ProjectsGridProps = {
  projects: Project[];
};

const TILT_ANGLES = [-2.8, 2.2, -3.5, 2.8, -2.0, 3.2];

/**
 * Individual Work Card mirroring Spencer Gabor's reactive scroll-in/scroll-out physics.
 * Dynamically tracks scroll up, scroll down, and scroll through with an IntersectionObserver.
 * Pops up with an elastic jelly bounce upon entering the viewport from ANY direction.
 */
function WorkCard({
  project,
  index,
  isDesktop,
}: {
  project: Project;
  index: number;
  isDesktop: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pointerTilt, setPointerTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // IntersectionObserver tracks enter AND leave so the pop-in animation
    // replays every time the user scrolls back to this section.
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsInView(entry.isIntersecting);
          });
        },
        {
          threshold: 0.05,
          // Generous margins so cards trigger early on mobile momentum scroll
          rootMargin: "60px 0px -20px 0px",
        }
      );
      observer.observe(el);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const imageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1200).height(900).url()
    : null;
  const projectSlug = project.slug?.current || project._id;
  const num = String(index + 1).padStart(2, "0");
  const tiltAngle = isDesktop ? TILT_ANGLES[index % TILT_ANGLES.length] : 0;
  const colStaggerDelay = isDesktop ? (index % 3) * 65 : 0;

  return (
    <div
      ref={cardRef}
      className="spencer-card-wrap flex flex-col items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setPointerTilt({ x: py * -6, y: px * 8 });
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setPointerTilt({ x: 0, y: 0 });
      }}
    >
      <div
        className="w-full transition-transform duration-500 ease-out"
        style={{
          transform: isHovered
            ? `perspective(900px) rotateX(${pointerTilt.x}deg) rotateY(${pointerTilt.y}deg) scale(1.03)`
            : `rotate(${tiltAngle}deg) scale(1)`,
          transformOrigin: "center center",
        }}
      >
        <Link
          href={`/projects/${projectSlug}`}
          data-cursor="View"
          className="spencer-card-media group relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-50 block"
          data-inview={isInView ? "true" : "false"}
          style={{
            animationDelay: `${colStaggerDelay}ms`,
            WebkitAnimationDelay: `${colStaggerDelay}ms`,
            transitionDelay: `${colStaggerDelay}ms`,
          }}
        >
          {/* Elastic Shadow Layer (GPU accelerated) */}
          <div className="spencer-card-shadow" />

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.coverImage?.alt || project.title || "Project"}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 380px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-100 text-center">
              <span className="font-mono text-2xl font-bold text-slate-300 mb-1">{num}</span>
              <p className="font-heading text-sm uppercase text-slate-700 font-bold line-clamp-2">{project.title}</p>
            </div>
          )}

          {/* Corner Index Tag */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 rounded-full bg-white/92 backdrop-blur-md px-3 sm:px-3.5 py-1 font-mono text-[11px] sm:text-xs font-bold text-slate-900 border border-slate-200 shadow-xs z-10">
            {num} //
          </div>

          {/* Direct Link Overlay Badge */}
          <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 rounded-full bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-slate-200 shadow-sm translate-y-1 group-hover:translate-y-0 z-10">
            Explore ↗
          </div>
        </Link>
      </div>

      {/* Spencer Gabor Signature Pill Button with coordinated elastic spring pop */}
      <Link
        href={`/projects/${projectSlug}`}
        data-cursor="View"
        className="spencer-card-pill mt-4 sm:mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#0a0a0c] text-white px-6 sm:px-7 py-2.5 sm:py-3 font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:bg-[#0055ff] hover:scale-105 active:scale-95 transition-colors duration-250 text-center max-w-full"
        data-inview={isInView ? "true" : "false"}
        style={{
          animationDelay: `${colStaggerDelay + 50}ms`,
          WebkitAnimationDelay: `${colStaggerDelay + 50}ms`,
          transitionDelay: `${colStaggerDelay + 50}ms`,
        }}
      >
        <span className="truncate">{project.title}</span>
        <span className="text-xs font-mono shrink-0">↗</span>
      </Link>
      {project.tagline && (
        <p className="mt-2 max-w-[16rem] text-center text-xs text-slate-500 font-sans leading-relaxed line-clamp-2">
          {project.tagline}
        </p>
      )}
    </div>
  );
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  // Responsive check: mobile cards are straight, desktop cards have organic tilt
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 border-t border-slate-200 bg-white overflow-x-clip"
    >
      {/* Centered Minimal Editorial Header with appropriate breathing room */}
      <div className="mx-auto max-w-4xl px-6 text-center mb-10 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#0055ff] font-semibold block mb-2 sm:mb-3">
          Selected Works // 02
        </span>
        <h2 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-[#0a0a0c] tracking-[-0.04em] leading-[0.9]">
          More Work
        </h2>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-500 font-sans max-w-md mx-auto leading-relaxed">
          Production systems, mobile apps &amp; AI-powered software
        </p>
      </div>

      {/* 1-Column on Mobile (one by one), 2-Column on Tablet, 3-Column on Desktop */}
      <div className="mx-auto max-w-7xl px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14">
        {projects.map((project, idx) => (
          <div key={project._id} className="w-full max-w-md md:max-w-none mx-auto flex justify-center">
            <WorkCard
              project={project}
              index={idx}
              isDesktop={isDesktop}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
