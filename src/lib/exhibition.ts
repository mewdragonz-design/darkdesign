import type { Post } from "@/hooks/usePosts";

export const orderedExhibits = (posts: Post[]) =>
  posts.filter((post) => post.is_visible && post.show_on_home)
    .sort((a, b) => a.display_order - b.display_order || a.id.localeCompare(b.id));

export const openingHighlights = (posts: Post[]) =>
  posts.filter((post) => post.is_visible && post.is_highlight)
    .sort((a, b) => a.display_order - b.display_order || a.id.localeCompare(b.id))
    .slice(0, 3);

export const exhibitionPresentation = (post: Post, registered: boolean) =>
  post.home_presentation === "demo" && registered ? "demo" : "abstract";