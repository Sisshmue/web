"use client";

import { useEffect } from "react";

export type ExperienceItem = {
  _id: string;
  company?: string | null;
  role?: string | null;
  isCurrent?: boolean | null;
  period?: string | null;
  location?: string | null;
  technologies?: string[] | null;
  responsibilities?: string[] | null;
  isEducation?: boolean;
  degree?: string | null;
  institution?: string | null;
  honors?: string | null;
  gpa?: string | null;
};

type ExperienceModalProps = {
  item: ExperienceItem | null;
  onClose: () => void;
};

export default function ExperienceModal({ item, onClose }: ExperienceModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.company || item.institution || "Experience Details"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] max-w-2xl w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 text-slate-900 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0055ff] font-semibold">
              {item.isEducation ? "Academic Credential" : "Role Dossier"}
            </span>
            {item.isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Role
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-500 hover:text-slate-950 hover:border-slate-300 transition-colors"
          >
            ESC ✕
          </button>
        </div>

        {/* Role Headline (Primary Focus) & Company */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0a0a0c]">
            {item.role || item.degree}
          </h2>
          <p className="mt-1 font-mono text-sm text-[#0055ff] font-semibold uppercase tracking-wider">
            @ {item.company || item.institution}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            {item.period && <span>{item.period}</span>}
            {item.location && (
              <>
                <span>•</span>
                <span>{item.location}</span>
              </>
            )}
            {item.honors && (
              <>
                <span>•</span>
                <span className="text-[#0055ff] font-semibold">★ {item.honors}</span>
              </>
            )}
            {item.gpa && (
              <>
                <span>•</span>
                <span>GPA: {item.gpa}</span>
              </>
            )}
          </div>
        </div>

        {/* Key Responsibilities / Scope */}
        {item.responsibilities && item.responsibilities.length > 0 && (
          <div className="space-y-3 mb-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">
              Key Engineering Contributions
            </h3>
            <ul className="space-y-2.5">
              {item.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-sans leading-relaxed">
                  <span className="text-[#0055ff] font-mono text-xs mt-0.5">▹</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Badges */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-mono text-slate-700"
                >
                  #{tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
