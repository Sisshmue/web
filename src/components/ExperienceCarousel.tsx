"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ExperienceModal, { ExperienceItem } from "./ExperienceModal";

type ExperienceData = {
  _id: string;
  company?: string | null;
  role?: string | null;
  isCurrent?: boolean | null;
  period?: string | null;
  location?: string | null;
  technologies?: string[] | null;
  responsibilities?: string[] | null;
  order?: number | null;
};

type EducationData = {
  _id: string;
  degree?: string | null;
  institution?: string | null;
  honors?: string | null;
  gpa?: string | null;
  period?: string | null;
  order?: number | null;
};

type ExperienceCarouselProps = {
  experiences: ExperienceData[];
  education?: EducationData[];
};

export default function ExperienceCarousel({ experiences, education }: ExperienceCarouselProps) {
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Drag/touch state
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);
  const closestIdxRef = useRef(0);

  // Debounced scroll-end fallback timer
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Combine professional experiences with academic honors to form slides
  const items: ExperienceItem[] = [
    ...experiences.map((exp) => ({
      _id: exp._id,
      company: exp.company,
      role: exp.role,
      isCurrent: exp.isCurrent,
      period: exp.period,
      location: exp.location,
      technologies: exp.technologies,
      responsibilities: exp.responsibilities,
      isEducation: false,
    })),
    ...(education && education.length > 0
      ? education.map((edu) => ({
          _id: edu._id,
          company: edu.institution,
          role: edu.degree,
          period: edu.period,
          honors: edu.honors,
          gpa: edu.gpa,
          institution: edu.institution,
          degree: edu.degree,
          technologies: ["Computer Science", "Algorithms", "Distributed Systems", "Software Architecture"],
          responsibilities: [
            `Graduated with ${edu.honors || "First Class Honors"} (GPA: ${edu.gpa || "3.94"}).`,
            "Specialized in full-stack architecture, machine learning systems, and enterprise mobile software engineering.",
            "Recognized on Dean's Honor List across all academic years.",
          ],
          isEducation: true,
        }))
      : []),
  ];

  // Calculate Spencer Gabor signature parabolic curve & rotation
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

      // Outward rotation (-5.5deg to +5.5deg)
      const rotate = Math.max(-5.5, Math.min(5.5, distFromCenter * 0.015));

      // Parabolic vertical dip: center is 0px, edges dip down smoothly
      const dip = Math.min(42, Math.pow(distFromCenter / 300, 2) * 14);

      // Subtle scale curve
      const scale = Math.max(0.95, 1 - Math.abs(distFromCenter) / 3200);

      slide.style.transform = `translate3d(0, ${dip}px, 0) rotate(${rotate}deg) scale(${scale})`;
      slide.style.transformOrigin = "50% 120%";
    });

    setActiveIndex(closestIdx);
    closestIdxRef.current = closestIdx;
  }, []);

  // Listen for scroll and resize events with mobile-compatible detection
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCurves);

      // Debounced scroll-end fallback for browsers without scrollend event
      // This ensures activeIndex is correct after momentum scrolling on iOS
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = setTimeout(() => {
        updateCurves();
      }, 120);
    };

    // Native scrollend event (Chrome 114+, Firefox 109+)
    // Fires once when scroll settles — perfect for mobile momentum
    const handleScrollEnd = () => {
      updateCurves();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("scrollend", handleScrollEnd, { passive: true } as AddEventListenerOptions);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [updateCurves]);

  // ─── Mouse Drag handlers (desktop) ───
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
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    scrollToSlide(closestIdxRef.current);
  };

  // ─── Touch handlers (mobile & tablet) ───
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
    draggedDistanceRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - startXRef.current) * 1.2;
    draggedDistanceRef.current += Math.abs(x - startXRef.current);
    startXRef.current = x; // Update for continuous tracking
    carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    // Let CSS snap-mandatory handle the final snap position
    // Then after a brief delay, update curves to ensure counter is correct
    setTimeout(() => {
      updateCurves();
    }, 350);
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
    const next = Math.min(items.length - 1, activeIndex + 1);
    scrollToSlide(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const section = document.getElementById("experience");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToSlide(Math.min(items.length - 1, closestIdxRef.current + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToSlide(Math.max(0, closestIdxRef.current - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  return (
    <section id="experience" className="min-h-[85svh] sm:min-h-[100svh] flex flex-col justify-center py-8 sm:py-12 border-t border-slate-200 bg-white overflow-hidden">
      {/* Centered Minimal Header */}
      <div className="mx-auto max-w-4xl px-6 text-center mb-3 sm:mb-5">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#0055ff] font-semibold block mb-1.5 sm:mb-2">
          Career Trajectory // 01
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-[#0a0a0c] tracking-[-0.04em] leading-[0.9]">
          Featured Experience
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 font-sans max-w-md mx-auto leading-relaxed">
          Production engineering roles, system architecture &amp; technical impact
        </p>

        {/* Minimal Controls Row */}
        <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-slate-200 bg-white text-slate-800 hover:border-[#0055ff] hover:text-[#0055ff] shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center font-mono text-sm active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous role"
          >
            ←
          </button>

          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 min-w-[70px] text-center">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={scrollNext}
            disabled={activeIndex === items.length - 1}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-slate-200 bg-white text-slate-800 hover:border-[#0055ff] hover:text-[#0055ff] shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center font-mono text-sm active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Next role"
          >
            →
          </button>
        </div>
      </div>

      {/* Signature Curved Carousel — Mobile-optimized with touch + snap-mandatory */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex gap-6 sm:gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-8 pb-12 sm:pt-10 sm:pb-16 cursor-grab ${
          isDragging ? "cursor-grabbing select-none" : ""
        } px-[8vw] sm:px-[22vw] lg:px-[30vw]`}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item, idx) => {
          const num = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={item._id}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className="w-[82vw] sm:w-[50vw] md:w-[42vw] lg:w-[36vw] max-w-[460px] shrink-0 snap-center flex flex-col items-center select-none"
              style={{
                transform: "translate3d(0, 0, 0)",
                WebkitTransform: "translate3d(0, 0, 0)",
              }}
            >
              {/* Company Dossier Cube */}
              <div
                onClick={() => {
                  if (draggedDistanceRef.current < 8) {
                    setSelectedItem(item);
                  }
                }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fafc] p-5 sm:p-7 shadow-[0_10px_28px_rgba(0,0,0,0.05)] hover:shadow-[0_22px_45px_rgba(0,85,255,0.12)] hover:border-[#0055ff]/40 transition-all duration-500 cursor-pointer flex flex-col justify-between group"
                data-cursor="Open"
              >
                {/* Top Metadata Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-white px-3 py-1 font-mono text-xs font-bold text-slate-900 border border-slate-200 shadow-2xs">
                      {num} //
                    </span>
                    {item.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    {item.period}
                  </span>
                </div>

                {/* Role Headline (Primary Focus) & Company Subtitle */}
                <div className="my-auto py-2 sm:py-2.5">
                  <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold uppercase text-[#0a0a0c] tracking-tight group-hover:text-[#0055ff] transition-colors leading-[1.05]">
                    {item.role}
                  </h3>
                  <p className="mt-1 sm:mt-1.5 font-mono text-xs sm:text-sm text-[#0055ff] uppercase font-semibold tracking-wider">
                    @ {item.company}
                  </p>

                  {/* High-impact bullet point snippet */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-sans line-clamp-2 leading-relaxed">
                      {item.responsibilities[0]}
                    </p>
                  )}
                </div>

                {/* Bottom Row: Location & Key Tech Tags */}
                <div className="pt-2 sm:pt-2.5 border-t border-slate-200/60 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
                    <span>{item.location || (item.isEducation ? "Chiang Rai, TH" : "Bangkok, TH")}</span>
                    <span className="text-[#0055ff] group-hover:translate-x-1 transition-transform font-medium">
                      View Dossier →
                    </span>
                  </div>

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {item.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md"
                        >
                          #{tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Spencer Gabor Signature Pill Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 rounded-full bg-[#0a0a0c] text-white px-5 sm:px-6 py-2 sm:py-2.5 font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:bg-[#0055ff] hover:scale-105 active:scale-95 transition-all duration-300"
                data-cursor="Open"
              >
                <span>{item.role}</span>
                <span className="text-xs font-mono">↗</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Experience Dossier Detail Modal */}
      <ExperienceModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
