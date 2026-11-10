const SUPABASE_URL =
  'https://uwyhgwjhvatkzqqcetlj.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  'sb_publishable_0RKhGdrwOFs7h8dtZEkyVw_gCh4vTSx';

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

window.supabaseClient =
  supabaseClient;
