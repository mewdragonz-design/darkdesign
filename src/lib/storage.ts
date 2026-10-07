import { supabase } from "@/integrations/supabase/client";

const BUCKET_NAME = "project-images";

export const uploadProjectImage = async (file: File, folder: string = "covers") => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const deleteProjectImage = async (url: string) => {
  // Extract the path from the full URL
  const path = url.split(`${BUCKET_NAME}/`)[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    console.error("Error deleting image:", error);
  }
};
