"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavbarProps = {
  profile?: {
    name?: string | null;
    title?: string | null;
    bio?: string | null;
    focus?: string | null;
    heroChips?: string[] | null;
  } | null;
  education?: Array<{
    degree?: string | null;
    institution?: string | null;
    honors?: string | null;
    gpa?: string | null;
    period?: string | null;
  }> | null;
  skills?: Array<{
    _id: string;
    title?: string | null;
    skills?: Array<{ _key?: string; name?: string | null; isPrimary?: boolean | null }> | null;
  }> | null;
};

export default function Navbar({ profile, education, skills }: NavbarProps) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const edu = education && education.length > 0 ? education[0] : null;
  const primarySkills = (() => {
    const all =
      skills?.flatMap((cat) => cat.skills || []).filter((skill) => skill.name) || [];
    const starred = all.filter((skill) => skill.isPrimary);
    return (starred.length > 0 ? starred : all).slice(0, 8);
  })();

  useEffect(() => {
    const open = () => setAboutOpen(true);
    window.addEventListener("portfolio:open-about", open);
    return () => window.removeEventListener("portfolio:open-about", open);
  }, []);

  useEffect(() => {
    if (!aboutOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 sm:px-12 pointer-events-none">
        <Link
          href="/"
          data-cursor="Home"
          className="pointer-events-auto font-mono text-xs uppercase tracking-[0.2em] font-semibold text-slate-950 hover:text-[#0055ff] transition-colors"
        >
          Siss Hmue Aung
        </Link>

        <div className="pointer-events-auto hidden md:flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-slate-600 bg-white/90 backdrop-blur-md border border-slate-200 px-3.5 py-1.5 rounded-full shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for work</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            data-cursor="About"
            onClick={() => setAboutOpen(true)}
            className="rounded-full border border-slate-200 bg-white/90 backdrop-blur-md px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-slate-700 hover:border-[#0055ff] hover:text-[#0055ff] shadow-xs hover:shadow transition-all duration-200 active:scale-95"
          >
            About
          </button>
          <a
            href="#contact"
            data-cursor="Say hi"
            className="rounded-full bg-[#0a0a0c] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-white hover:bg-[#0055ff] shadow-xs hover:shadow transition-all duration-200 active:scale-95"
          >
            Contact
          </a>
        </div>
      </header>

      {aboutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-6"
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="relative max-w-xl w-full rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 text-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0055ff] font-semibold">
                Information
              </span>
              <button
                type="button"
                onClick={() => setAboutOpen(false)}
                className="font-mono text-xs text-slate-400 hover:text-slate-900 transition-colors"
              >
                [CLOSE ✕]
              </button>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-2">
              {profile?.name || "Siss Hmue Aung"}
            </h2>
            <p className="font-mono text-xs text-[#0055ff] uppercase tracking-wider mb-6">
              {profile?.title || "Software Engineer"} • Bangkok, Thailand
            </p>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-sans">
              <p>
                {profile?.bio ||
                  "Software Engineer specializing in AI-powered applications, full-stack systems, and production software. Skilled in Python, TypeScript, Node.js, machine learning, REST APIs, and database design."}
              </p>
            </div>

            {primarySkills.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {primarySkills.map((skill) => (
                  <span
                    key={skill._key || skill.name}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-600"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}

            {edu && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block mb-2">
                  Academic Background
                </span>
                <p className="font-bold text-slate-950 text-sm">{edu.degree}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {edu.institution} {edu.period ? `(${edu.period})` : ""}
                </p>
                <div className="flex gap-2 mt-3 font-mono text-xs">
                  {edu.honors && (
                    <span className="text-[#0055ff] font-semibold">★ {edu.honors}</span>
                  )}
                  {edu.gpa && (
                    <span className="text-slate-500">• GPA: {edu.gpa}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
