import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl text-center space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">The page you’re looking for doesn’t exist or has been moved.</p>
      <Link href="/" className="inline-block rounded-full border px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10">Go home</Link>
    </div>
  );
}
