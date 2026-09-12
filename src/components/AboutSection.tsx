type AboutProps = {
  education?: Array<{
    _id: string;
    degree: string;
    institution: string;
    honors?: string | null;
    gpa?: string | null;
    period?: string | null;
  }> | null;
};

export default function AboutSection({ education }: AboutProps) {
  const edu = education && education.length > 0 ? education[0] : null;

  return (
    <section id="about" className="py-20 border-b border-[#1e2433]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-400">
            01 // About
          </span>
          <div className="h-px flex-1 bg-[#1e2433]" />
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Engineering Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineering with precision, from mobile interfaces to scalable backends.
            </h2>

            <div className="space-y-4 text-base text-slate-400 leading-relaxed">
              <p>
                I am a software engineer based in{" "}
                <strong className="text-slate-200 font-semibold">Bangkok, Thailand</strong>,
                specializing in high-performance full-stack architectures and cross-platform
                mobile solutions. My core work spans building fluid{" "}
                <strong className="text-slate-200 font-semibold">Flutter</strong> applications,
                resilient <strong className="text-slate-200 font-semibold">Node.js & TypeScript</strong>{" "}
                backends, and integrating modern{" "}
                <strong className="text-slate-200 font-semibold">Generative AI / LLM workflows</strong>{" "}
                into real-world systems.
              </p>
              <p>
                I focus heavily on clean architecture, normalized relational schemas, and systematic
                debugging. Whether deploying to production for 1,000+ active users or architecting
                enterprise IoT camera networks, my priority is shipping robust, predictable code.
              </p>
            </div>

            {/* Quick Principles */}
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-lg border border-[#1e2433] bg-[#11141c] p-4">
                <span className="font-mono text-xs text-sky-400">01. Architecture</span>
                <p className="mt-1 text-sm font-semibold text-slate-200">
                  Clean Architecture & Modular Patterns
                </p>
              </div>
              <div className="rounded-lg border border-[#1e2433] bg-[#11141c] p-4">
                <span className="font-mono text-xs text-sky-400">02. Full Stack</span>
                <p className="mt-1 text-sm font-semibold text-slate-200">
                  Flutter Mobile to Node/PostgreSQL
                </p>
              </div>
              <div className="rounded-lg border border-[#1e2433] bg-[#11141c] p-4">
                <span className="font-mono text-xs text-sky-400">03. AI Integration</span>
                <p className="mt-1 text-sm font-semibold text-slate-200">
                  Agentic Workflows & ATS Models
                </p>
              </div>
            </div>
          </div>

          {/* Academic & Location Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Education Card */}
            {edu && (
              <div className="rounded-2xl border border-[#1e2433] bg-[#11141c] p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-24 w-24 bg-sky-500/5 blur-2xl rounded-full" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Education & Credentials
                </span>

                <h3 className="mt-2 text-xl font-bold text-white leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-sky-400 mt-1">
                  {edu.institution}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-[#1e2433]">
                  {edu.honors && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-mono font-medium text-amber-300">
                      ★ {edu.honors}
                    </span>
                  )}
                  {edu.gpa && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-mono font-medium text-emerald-300">
                      GPA: {edu.gpa}
                    </span>
                  )}
                  {edu.period && (
                    <span className="rounded-md border border-[#1e2433] bg-[#161b26] px-2.5 py-1 text-xs font-mono text-slate-400">
                      Graduation {edu.period}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Location & Relocation Card */}
            <div className="rounded-2xl border border-[#1e2433] bg-[#11141c] p-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Location & Availability
              </span>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-2xl">🇹🇭</span>
                <div>
                  <h4 className="text-base font-semibold text-white">
                    Bangkok, Thailand
                  </h4>
                  <p className="text-xs text-slate-400">
                    Open to remote roles globally and on-site / hybrid in Southeast Asia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
