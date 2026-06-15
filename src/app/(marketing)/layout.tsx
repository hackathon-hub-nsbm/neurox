import BackgroundEffects from "./components/BackgroundEffects";
import InitialLoadingOverlay from "./components/InitialLoadingOverlay";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative bg-bg-primary text-text-primary scanlines">
      <BackgroundEffects />
      {children}
      <InitialLoadingOverlay />
    </div>
  );
}
