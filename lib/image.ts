export function isSupabaseStorageUrl(src: string | undefined | null): boolean {
  if (!src) {
    return false;
  }

  return /^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\//i.test(src);
}
