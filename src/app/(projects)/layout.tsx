import ProjectsNav from "./components/ProjectsNav";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-theme="gallery" className="min-h-screen bg-bg-primary text-text-primary">
      <ProjectsNav />
      <main>{children}</main>
    </div>
  );
}
