// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseSchema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA;

if (!supabaseUrl) {
  throw new Error("Missing Supabase URL");
}
if (!supabaseKey) {
  throw new Error("Missing Supabase Anon Key");
}
if (!supabaseSchema) {
  throw new Error("Missing Supabase Schema");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: supabaseSchema },
});