type SkillItem = {
  _key: string;
  name: string;
  isPrimary?: boolean | null;
};

type SkillCategory = {
  _id: string;
  title: string;
  order?: number | null;
  skills?: SkillItem[] | null;
};

type SkillsProps = {
  categories: SkillCategory[];
};

export default function SkillsSection({ categories }: SkillsProps) {
  return (
    <section id="skills" className="py-20 border-b border-[#1e2433]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-400">
            03 // Tech Stack & Architecture
          </span>
          <div className="h-px flex-1 bg-[#1e2433]" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
          Technical Skills & Tooling Matrix
        </h2>
        <p className="max-w-2xl text-base text-slate-400 mb-12">
          Production competencies categorized across language runtimes, frontend/mobile frameworks,
          distributed backend services, and modern AI engineering.
        </p>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col rounded-2xl border border-[#1e2433] bg-[#11141c] p-5 transition-all duration-200 hover:border-slate-700"
            >
              {/* Category Title */}
              <div className="flex items-center justify-between border-b border-[#1e2433] pb-3 mb-4">
                <h3 className="font-mono text-sm font-semibold text-white tracking-tight">
                  {cat.title}
                </h3>
                <span className="text-[10px] font-mono text-slate-600">
                  {cat.skills?.length || 0}
                </span>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {cat.skills?.map((skill) => (
                  <span
                    key={skill._key || skill.name}
                    className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${
                      skill.isPrimary
                        ? "border border-sky-400/40 bg-sky-400/10 font-semibold text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.1)]"
                        : "border border-[#1e2433] bg-[#161b26] text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
