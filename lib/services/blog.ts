import { db } from "../db";
import { mockBlogPosts } from "./mockData";
import { BlogPost } from "@/types";
import { BlogPost as DbBlogPost, Author as DbAuthor } from "@prisma/client";

type FullDbBlogPost = DbBlogPost & {
  author?: DbAuthor;
};

function mapDbBlogPostToBlogPost(p: FullDbBlogPost): BlogPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    image: p.image,
    authorId: p.authorId,
    author: p.author,
    publishedAt: p.publishedAt,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db.blogPost.findMany({
      include: { author: true },
      orderBy: { publishedAt: "desc" },
    });
    if (posts.length > 0) {
      return posts.map(mapDbBlogPostToBlogPost);
    }
  } catch (error) {
    console.error("Error in getBlogPosts:", error);
  }
  return mockBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (post) {
      return mapDbBlogPostToBlogPost(post);
    }
  } catch (error) {
    console.error("Error in getBlogPostBySlug:", error);
  }
  return mockBlogPosts.find((p) => p.slug === slug) || null;
}
