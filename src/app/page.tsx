import { client } from "@/sanity/client";
import { PORTFOLIO_PAGE_QUERY } from "@/sanity/queries";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsTicker from "@/components/SkillsTicker";
import ExperienceCarousel from "@/components/ExperienceCarousel";
import ProjectsGrid from "@/components/ProjectsGrid";
import FooterContact from "@/components/FooterContact";

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const data = await client.fetch(PORTFOLIO_PAGE_QUERY, {}, options);

  const profile = data?.profile || null;
  const projects = data?.projects || [];
  const experiences = data?.experiences || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col selection:bg-[#0055ff] selection:text-white" id="top">
      <Navbar profile={profile} education={education} skills={skills} />

      <main className="flex-1 flex flex-col">
        <HeroSection profile={profile} />
        <SkillsTicker categories={skills} />
        <ExperienceCarousel experiences={experiences} education={education} />
        <ProjectsGrid projects={projects} />
      </main>

      {/* Footer as a Moment (Full Viewport Closing Statement) */}
      <FooterContact profile={profile} />
    </div>
  );
}
