"use client";

import { useState } from "react";

type ProfileData = {
  name?: string | null;
  location?: string | null;
  availability?: string | null;
  socialLinks?: {
    github?: string | null;
    linkedin?: string | null;
    whatsapp?: string | null;
    email?: string | null;
  } | null;
} | null;

type FooterProps = {
  profile?: ProfileData;
  socialLinks?: {
    github?: string | null;
    linkedin?: string | null;
    whatsapp?: string | null;
    email?: string | null;
  } | null;
};

export default function FooterContact({ profile, socialLinks }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const links = profile?.socialLinks || socialLinks;
  const email = links?.email || "";
  const github = links?.github || "";
  const linkedin = links?.linkedin || "";
  const whatsapp = links?.whatsapp || "";

  const fullName = profile?.name || "Siss Hmue Aung";
  const shortName = profile?.name
    ? profile.name.trim().split(/\s+/).slice(0, 2).join(" ")
    : "Siss Hmue";
  const location = profile?.location || "";
  const availability = profile?.availability || "Open for opportunities";

  function copyEmail() {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <footer
      id="contact"
      className="relative min-h-[75svh] sm:min-h-[100svh] w-full flex flex-col justify-between px-6 py-8 sm:px-12 sm:py-10 border-t border-slate-200 bg-white overflow-hidden"
    >
      {/* Top Header Row */}
      <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <div>03 // Closing Statement</div>
        {availability && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0055ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0055ff]"></span>
            </span>
            <span className="text-[#0055ff] font-semibold">{availability}</span>
          </div>
        )}
      </div>

      {/* Middle: Giant Interactive Contact Statement */}
      <div className="my-auto py-6 sm:py-10 flex flex-col items-start justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400 mb-3 sm:mb-4">
          Initiate Contact
        </span>

        {/* Big Email Link with Expanding Underline */}
        {email && (
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4 mb-5 sm:mb-8">
            <a
              href={`mailto:${email}`}
              data-cursor="Email"
              className="group relative text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#0a0a0c] tracking-tight font-heading inline-block break-all sm:break-normal"
            >
              <span>{email}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#0055ff] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="self-start rounded-full border border-slate-200 bg-white px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-slate-600 hover:border-[#0055ff] hover:text-[#0055ff] shadow-xs hover:shadow transition-all duration-200 active:scale-95"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        )}

        {/* Large Secondary Navigation Links with Arrow Tilt */}
        <div className="flex flex-wrap gap-6 sm:gap-10 font-mono text-xs sm:text-base uppercase tracking-widest text-slate-600 pt-1 sm:pt-2">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 hover:text-slate-950 transition-colors"
              data-cursor="↗"
            >
              <span>LinkedIn</span>
              <span className="text-[#0055ff] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 hover:text-slate-950 transition-colors"
              data-cursor="↗"
            >
              <span>GitHub</span>
              <span className="text-[#0055ff] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 hover:text-slate-950 transition-colors"
              data-cursor="↗"
            >
              <span>WhatsApp</span>
              <span className="text-[#0055ff] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom: Massive Graphic Signoff (Watermark hover reveal) */}
      <div className="w-full select-none pt-6 sm:pt-8 border-t border-slate-200">
        <div
          data-cursor="Nice"
          className="font-extrabold uppercase text-slate-100 hover:text-[#0a0a0c] tracking-[-0.05em] leading-[0.8] text-[12vw] transition-colors duration-700 footer-watermark"
        >
          {shortName}
        </div>

        {/* Bottom Metadata Bar */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
          <div>
            © {new Date().getFullYear()} {fullName}
            {location ? ` • ${location}` : ""}
          </div>
          <a href="#top" data-cursor="Top" className="hover:text-[#0055ff] transition-colors">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
