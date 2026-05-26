import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://qicidbagwryztgsgmuvj.supabase.co";

const supabaseAnonKey =
  "sb_publishable_Xl9shedhz1C2hdYp1-NQcw_nY_EGodq";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseAnonKey
  );