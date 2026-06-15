import ProjectsNav from "./components/ProjectsNav";
import BackgroundEffects from "../(marketing)/components/BackgroundEffects";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative bg-bg-primary text-text-primary scanlines">
      <BackgroundEffects />
      <ProjectsNav />
      <main>{children}</main>
    </div>
  );
}
