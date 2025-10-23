import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase";

export const revalidate = 60;

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  location: string | null;
  published_at: string | null;
};

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, content, cover_image_url, location, published_at")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching post", error);
    return null;
  }
  return data as Post | null;
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/" className="hover:underline">← Back to all trips</Link>
      </div>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{post.title}</h1>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {[post.location, formatDate(post.published_at)].filter(Boolean).join(" • ")}
        </div>
      </header>

      {post.cover_image_url ? (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900">
          <Image src={post.cover_image_url} alt={post.title} fill sizes="100vw" className="object-cover" />
        </div>
      ) : null}

      <section className="prose prose-zinc dark:prose-invert mt-8 max-w-none">
        <div className="whitespace-pre-wrap leading-8 text-zinc-800 dark:text-zinc-200">
          {post.content}
        </div>
      </section>
    </article>
  );
}
