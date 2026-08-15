import ServicesNav from "@/components/ServicesNav";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The header is fixed, so the sub-nav needs the flow pushed clear of it.
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <ServicesNav />
      {children}
    </div>
  );
}
