"use client";

import { useEffect } from "react";
import Image from "next/image";

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  title: string;
};

export default function ProjectLightbox({
  isOpen,
  onClose,
  imageUrl,
  title,
}: LightboxProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 sm:p-8 transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-5xl w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 bg-white">
          <span className="font-mono text-xs font-semibold text-slate-800 truncate max-w-[80%]">
            {title} — Screenshot Preview
          </span>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-mono text-slate-500 hover:text-slate-950 hover:border-slate-300 transition-colors"
            aria-label="Close modal"
          >
            ESC ✕
          </button>
        </div>

        {/* Modal Image Display */}
        <div className="relative aspect-video w-full max-h-[75vh] bg-slate-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </div>
    </div>
  );
}
