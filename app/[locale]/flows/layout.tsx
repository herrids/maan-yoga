export default function FlowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-8">
      <div className="w-full max-w-6xl">{children}</div>
    </section>
  );
}
