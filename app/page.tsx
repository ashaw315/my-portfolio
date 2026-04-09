import Hero from "@/components/home/Hero";
import ProjectTable from "@/components/home/ProjectTable";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className="home-viewport">
      <Hero />
      <ProjectTable projects={projects} />
    </div>
  );
}
