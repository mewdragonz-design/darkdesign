import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "./useProjects";

export interface ProjectWithSlug extends Project {
  slug: string | null;
}

export const useProject = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      
      const { data, error } = await (supabase as any)
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("is_visible", true)
        .single();

      if (error) throw error;
      return data as ProjectWithSlug;
    },
    enabled: !!slug,
  });
};
