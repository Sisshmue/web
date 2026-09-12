"use client";

import CustomCursor from "./CustomCursor";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="site-grain" aria-hidden />
      <CustomCursor />
      {children}
    </>
  );
}
