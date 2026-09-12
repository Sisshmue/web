import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const options = { next: { revalidate: 30 } };

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug }, options);

  if (!project) {
    return notFound();
  }

  const imageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1400).height(800).url()
    : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link
            href="/"
            data-cursor="Back"
            className="flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-[#0055ff] transition-colors font-medium"
          >
            <span>←</span>
            <span>Back to Portfolio</span>
          </Link>

          <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600">
            Case Study
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12 flex-1 w-full">
        {/* Title & Tagline */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-[#0a0a0c] sm:text-5xl">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-lg text-slate-600 leading-relaxed font-sans">
              {project.tagline}
            </p>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.siteUrl && (
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0055ff] px-5 py-2 text-xs font-mono font-semibold text-white hover:bg-[#0047e0] transition-all shadow-xs hover:shadow"
                data-cursor="Live"
              >
                <span>Live Production Site</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-mono font-medium text-slate-700 hover:border-slate-900 hover:text-slate-950 transition-all shadow-xs"
              >
                <span>GitHub Repository</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {imageUrl && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 mb-10 shadow-lg panel-enter">
            <Image
              src={imageUrl}
              alt={project.coverImage?.alt || project.title || "Project Preview"}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        {/* Technologies Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0055ff] mb-3">
              Technologies & Frameworks
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono text-slate-700 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Overview / Rich Text */}
        {project.overview && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0055ff] mb-4">
              Project Architecture & Overview
            </h2>
            <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed">
              <PortableText value={project.overview} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-[#0055ff] transition-colors font-medium">
          ← Back to Portfolio
        </Link>
      </footer>
    </div>
  );
}
