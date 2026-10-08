import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string | null;
  hero_image: string | null;
  is_highlight: boolean;
  demo_path: string | null;
  display_order: number;
  is_visible: boolean;
  show_on_home: boolean;
  home_presentation: string;
  home_summary: string | null;
  created_at: string;
  updated_at: string;
}

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
};

export const useAdminPosts = () => {
  return useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
};
