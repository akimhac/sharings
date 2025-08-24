import { supabase } from "./supa"

export type SearchParams = {
  q?: string
  cityId?: string
  services?: string[]
  priceMax?: number
  sort?: "rating" | "price"
  page?: number
  pageSize?: number
}
export async function searchBusinesses(p: SearchParams) {
  const page = p.page ?? 1
  const size = p.pageSize ?? 20
  let q = supabase
    .from("businesses")
    .select("id,kind,name,address,price_min,price_max,rating,tags,images,city:cities(name)", { count: "exact" })
    .limit(size)
    .range((page - 1) * size, page * size - 1)
    .order(p.sort === "price" ? "price_min" : "rating", { ascending: p.sort === "price" })
  if (p.cityId) q = q.eq("city_id", p.cityId)
  if (p.q) q = q.ilike("name", `%${p.q}%`)
  if (p.services?.length) q = q.contains("tags", p.services)
  if (p.priceMax) q = q.lte("price_max", p.priceMax)
  const { data, error, count } = await q
  if (error) throw error
  return { data, count }
}
export async function getCities(prefix: string) {
  if (!prefix) return []
  const { data, error } = await supabase
    .from("cities")
    .select("id,name")
    .ilike("name", `${prefix}%`)
    .limit(8)
  if (error) throw error
  return data!
}
