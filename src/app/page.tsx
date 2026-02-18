export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Your App
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
        </p>
      </main>
    </div>
  );
}
