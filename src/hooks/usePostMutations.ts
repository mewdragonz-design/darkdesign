import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PostInput {
  title: string;
  slug?: string;
  excerpt?: string | null;
  content?: string | null;
  hero_image?: string | null;
  is_highlight?: boolean;
  demo_path?: string | null;
  is_visible?: boolean;
  display_order?: number;
  show_on_home?: boolean;
  home_presentation?: string;
  home_summary?: string | null;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: PostInput) => {
      const { data, error } = await supabase
        .from("posts")
        .insert(post)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created");
    },
    onError: (error) => {
      toast.error("Failed to create post: " + error.message);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...post }: PostInput & { id: string }) => {
      const { data, error } = await supabase
        .from("posts")
        .update(post)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated");
    },
    onError: (error) => {
      toast.error("Failed to update post: " + error.message);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete post: " + error.message);
    },
  });
};
