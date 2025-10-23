import Link from "next/link";
import Image from "next/image";
import { supabase } from "./utils/supabase";

export const revalidate = 60;

type ListPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  location: string | null;
  published_at: string | null;
};

async function getPosts(): Promise<ListPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, location, published_at")
    .order("published_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Error loading posts:", error);
    return [];
  }
  return data ?? [];
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">See the world through your stories</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">Share your trips with beautiful images, locations, and memories. Add posts from your Supabase dashboard any time.</p>
      </section>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-8">
          <p className="text-lg">No trips yet.</p>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Use your Supabase dashboard to insert your first post into the "posts" table. This page updates automatically.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <li key={post.id} className="group">
              <Link href={`/posts/${post.slug}`} className="block rounded-xl overflow-hidden border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow bg-white/60 dark:bg-black/40">
                <div className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-900">
                  {post.cover_image_url ? (
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {post.location || ""} {post.published_at ? (post.location ? "• " : "") + formatDate(post.published_at) : ""}
                  </div>
                  <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
                  {post.excerpt ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{post.excerpt}</p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
