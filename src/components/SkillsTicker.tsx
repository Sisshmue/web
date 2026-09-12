"use client";

type SkillItem = {
  _key?: string;
  name?: string | null;
  isPrimary?: boolean | null;
};

type SkillCategory = {
  _id: string;
  title?: string | null;
  skills?: SkillItem[] | null;
};

type SkillsTickerProps = {
  categories: SkillCategory[];
};

export default function SkillsTicker({ categories }: SkillsTickerProps) {
  const skills = categories.flatMap((cat) =>
    (cat.skills || [])
      .map((skill) => skill.name?.trim())
      .filter((name): name is string => Boolean(name))
  );

  if (skills.length === 0) return null;

  const loop = [...skills, ...skills];

  return (
    <section
      aria-label="Technical skills"
      className="relative border-y border-slate-200 bg-white py-3 sm:py-4 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

      <div className="skills-marquee flex w-max gap-3" style={{ transform: 'translate3d(0,0,0)', WebkitTransform: 'translate3d(0,0,0)' }}>
        {loop.map((name, idx) => (
          <span
            key={`${name}-${idx}`}
            className="inline-flex shrink-0 items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-slate-500"
          >
            <span className="text-[#0055ff]">✦</span>
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
