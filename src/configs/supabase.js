import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://opqpejvnajizzbetaftk.supabase.co";

const supabaseKey =
  "sb_publishable_e22__KmlkKH0mJGhQYjmfQ_vvouuRO2";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);