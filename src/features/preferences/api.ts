import { supa } from "../../lib/supa";
export type Prefs = { cities: string[]; radius_km: number; services: string[]; budget_min?: number; budget_max?: number; notifications: boolean; };
export async function getPrefs(userId: string) {
  if (!supa) return null;
  const { data, error } = await supa.from("user_preferences").select("*").eq("user_id", userId).single();
  if (error && error.code !== "PGRST116") throw error;
  return data as Prefs | null;
}
export async function upsertPrefs(userId: string, prefs: Partial<Prefs>) {
  if (!supa) return;
  const { error } = await supa.from("user_preferences").upsert({ user_id: userId, ...prefs });
  if (error) throw error;
}
