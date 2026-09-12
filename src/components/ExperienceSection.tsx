type ExperienceItem = {
  _id: string;
  company: string;
  role: string;
  isCurrent?: boolean | null;
  period: string;
  location?: string | null;
  technologies?: Array<string> | null;
  responsibilities?: Array<string> | null;
};

type ExperienceProps = {
  experiences: ExperienceItem[];
};

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 border-b border-[#1e2433]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-400">
            04 // Work Experience
          </span>
          <div className="h-px flex-1 bg-[#1e2433]" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
          Professional Software Engineering History
        </h2>
        <p className="max-w-2xl text-base text-slate-400 mb-12">
          Engineering roles building production mobile apps, backend microservices, and enterprise
          systems across distributed teams.
        </p>

        {/* Timeline Stack */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className={`rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-slate-600 ${
                exp.isCurrent
                  ? "border-sky-500/40 bg-[#11141c] shadow-[0_4px_24px_rgba(56,189,248,0.06)]"
                  : "border-[#1e2433] bg-[#11141c]"
              }`}
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-slate-600 font-mono">@</span>
                    <span className="text-lg font-semibold text-sky-400">
                      {exp.company}
                    </span>
                    {exp.isCurrent && (
                      <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase text-sky-300">
                        Current Role
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span>{exp.period}</span>
                  {exp.location && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span>{exp.location}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Responsibilities Bullets */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="space-y-2 mb-6 text-sm text-slate-300">
                  {exp.responsibilities.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-sky-400 font-mono text-xs mt-1">▹</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Tags */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1e2433]">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#1e2433] bg-[#161b26] px-2.5 py-1 text-xs font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
