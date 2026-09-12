"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import ProjectLightbox from "./ProjectLightbox";

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
};

type ProjectsProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [activeImage, setActiveImage] = useState<{ url: string; title: string } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Drag state
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);

  // Calculate Spencer Gabor signature parabolic curve & rotation for each slide
  const updateCurves = useCallback(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    slidesRef.current.forEach((slide, idx) => {
      if (!slide) return;
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distFromCenter = slideCenter - containerCenter;

      if (Math.abs(distFromCenter) < minDistance) {
        minDistance = Math.abs(distFromCenter);
        closestIdx = idx;
      }

      // Rotation: outward rotation (-5deg to +5deg)
      const rotate = Math.max(-5.5, Math.min(5.5, distFromCenter * 0.015));

      // Parabolic vertical dip: center is 0px, outer cards dip smoothly down
      const dip = Math.min(42, Math.pow(distFromCenter / 300, 2) * 14);

      // Scale: center card is 1.0, outer cards gently scale down to 0.95
      const scale = Math.max(0.95, 1 - Math.abs(distFromCenter) / 3200);

      // Direct hardware-accelerated transform update without React re-render
      slide.style.transform = `translate3d(0, ${dip}px, 0) rotate(${rotate}deg) scale(${scale})`;
      slide.style.transformOrigin = "50% 120%";
    });

    setActiveIndex(closestIdx);
  }, []);

  // Set up scroll and resize listeners for smooth 60fps curves
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCurves);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial calculation
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateCurves]);

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
    draggedDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    draggedDistanceRef.current += Math.abs(walk);
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const scrollToSlide = (index: number) => {
    const slide = slidesRef.current[index];
    const container = carouselRef.current;
    if (!slide || !container) return;

    const slideRect = slide.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetScrollLeft =
      container.scrollLeft +
      (slideRect.left - containerRect.left) -
      (containerRect.width / 2 - slideRect.width / 2);

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    const prev = Math.max(0, activeIndex - 1);
    scrollToSlide(prev);
  };

  const scrollNext = () => {
    const next = Math.min(projects.length - 1, activeIndex + 1);
    scrollToSlide(next);
  };

  return (
    <section id="projects" className="py-24 sm:py-36 border-t border-slate-200 bg-white overflow-hidden">
      {/* Centered Minimal Header (Spencer Gabor style) */}
      <div className="mx-auto max-w-4xl px-6 text-center mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#0055ff] font-semibold block mb-2">
          Selected Works
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-[#0a0a0c] tracking-[-0.04em] leading-[0.9]">
          Featured Work
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-500 font-sans max-w-md mx-auto leading-relaxed">
          Select recent and notable software engineering projects
        </p>

        {/* Minimal Controls Row (Centered) */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            className="h-11 w-11 rounded-full border border-slate-200 bg-white text-slate-800 hover:border-[#0055ff] hover:text-[#0055ff] shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center font-mono text-sm active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous project"
          >
            ←
          </button>

          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 min-w-[70px] text-center">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={scrollNext}
            disabled={activeIndex === projects.length - 1}
            className="h-11 w-11 rounded-full border border-slate-200 bg-white text-slate-800 hover:border-[#0055ff] hover:text-[#0055ff] shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center font-mono text-sm active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>

      {/* Signature Curved Carousel (.carousel.curve) */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex gap-8 sm:gap-12 overflow-x-auto no-scrollbar pt-6 pb-16 cursor-grab ${
          isDragging ? "cursor-grabbing select-none" : ""
        } px-[8vw] sm:px-[22vw] lg:px-[30vw]`}
      >
        {projects.map((project, idx) => {
          const imageUrl = project.coverImage?.asset
            ? urlFor(project.coverImage).width(1600).height(1200).url()
            : null;
          const projectSlug = project.slug?.current || project._id;
          const num = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={project._id}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className="w-[82vw] sm:w-[56vw] md:w-[46vw] lg:w-[38vw] max-w-[540px] shrink-0 flex flex-col items-center select-none will-change-transform transition-transform duration-100 ease-out"
            >
              {/* Rounded Media Card */}
              {imageUrl && (
                <div
                  onClick={() => {
                    // Only open lightbox if not dragging
                    if (draggedDistanceRef.current < 8) {
                      setActiveImage({
                        url: imageUrl,
                        title: project.title || "Project Screenshot",
                      });
                    }
                  }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition-all duration-500 hover:border-[#0055ff]/40 shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,85,255,0.12)] cursor-pointer group"
                >
                  <Image
                    src={imageUrl}
                    alt={project.coverImage?.alt || project.title || "Project"}
                    fill
                    sizes="(max-width: 1024px) 85vw, 600px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  {/* Corner Index Tag */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 font-mono text-xs font-bold text-slate-900 border border-slate-200 shadow-xs">
                    {num} //
                  </div>

                  {/* Click to Zoom Overlay Tag */}
                  <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-slate-200 shadow-sm translate-y-1 group-hover:translate-y-0">
                    Zoom ⤢
                  </div>
                </div>
              )}

              {/* Spencer Gabor Signature Pill Button */}
              <Link
                href={`/projects/${projectSlug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a0a0c] text-white px-7 py-3 font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-md hover:bg-[#0055ff] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>{project.title}</span>
                <span className="text-xs font-mono">↗</span>
              </Link>

              {/* Tagline / Subtitle */}
              {project.tagline && (
                <p className="mt-3 text-xs sm:text-sm text-slate-500 font-sans text-center max-w-sm line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>
              )}

              {/* Direct Action Links Row */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
                {project.siteUrl && (
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1 text-[11px] text-slate-700 hover:border-[#0055ff] hover:text-[#0055ff] transition-all shadow-2xs active:scale-95"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1 text-[11px] text-slate-700 hover:border-slate-900 hover:text-slate-950 transition-all shadow-2xs active:scale-95"
                  >
                    Source ↗
                  </a>
                )}
                <Link
                  href={`/projects/${projectSlug}`}
                  className="text-[11px] text-slate-400 hover:text-[#0055ff] transition-colors py-1 px-2"
                >
                  Case Study →
                </Link>
              </div>

              {/* Technologies row in clean JetBrains Mono */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 max-w-xs">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox for Fullscreen Image Zoom */}
      <ProjectLightbox
        isOpen={Boolean(activeImage)}
        imageUrl={activeImage?.url || null}
        title={activeImage?.title || ""}
        onClose={() => setActiveImage(null)}
      />
    </section>
  );
}
