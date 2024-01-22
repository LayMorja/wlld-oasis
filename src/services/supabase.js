import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://httbpmwpvxzgjwaxfnvf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dGJwbXdwdnh6Z2p3YXhmbnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMTExNTEsImV4cCI6MjAyMDc4NzE1MX0.TcxNEJMdqoiHTNI1uxvcwssKKOS-l6cZCYK7VicGfhI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
