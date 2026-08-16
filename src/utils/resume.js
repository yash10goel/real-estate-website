import { supabase } from "../configs/supabase";

const SIGNED_URL_TTL = 60 * 10; // 10 minutes — resumes are private, links expire

export async function getResumeViewUrl(path) {
  const { data, error } = await supabase.storage.from("resumes").createSignedUrl(path, SIGNED_URL_TTL);
  if (error) throw error;
  return data.signedUrl;
}

export async function getResumeDownloadUrl(path, filename) {
  const { data, error } = await supabase.storage
    .from("resumes")
    .createSignedUrl(path, SIGNED_URL_TTL, { download: filename || true });
  if (error) throw error;
  return data.signedUrl;
}

export async function deleteResume(path) {
  if (!path) return;
  const { error } = await supabase.storage.from("resumes").remove([path]);
  if (error) throw error;
}

export function formatFileSize(bytes) {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  if (mb < 0.01) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${mb.toFixed(2)} MB`;
}

export function fileExtension(filename) {
  if (!filename) return "";
  return filename.split(".").pop().toUpperCase();
}
