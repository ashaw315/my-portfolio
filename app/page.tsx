import Hero from "@/components/home/Hero";
import ProjectGrid from "@/components/home/ProjectGrid";
import LabSection from "@/components/home/LabSection";
import { getFeaturedProjects, getLabProjects } from "@/lib/projects";

export default function Home() {
  const projects = getFeaturedProjects();
  const labProjects = getLabProjects();

  return (
    <>
      <Hero />
      <ProjectGrid projects={projects} />
      <LabSection projects={labProjects} />
    </>
  );
}
