import { createClient } from '@supabase/supabase-js'

// Single shared Supabase client (ai-spec.md §5 "Supabase access") — every
// feature that talks to Supabase (Contact insert, Back Office select/delete)
// imports this instance instead of calling createClient() itself.
//
// URL/key come from VITE_-prefixed env vars only (contact-page.feature.md
// §2): a local, gitignored .env in dev, and GitHub Actions repository
// secrets passed via deploy.yml in CI. Never hardcoded here.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If the env vars are missing (unconfigured deploy, forgotten local .env),
// skip createClient() entirely rather than letting it throw — callers check
// `supabase` for null and show a graceful failure message instead of
// crashing the page (ai-spec.md §6 Global Definition of Done).
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
