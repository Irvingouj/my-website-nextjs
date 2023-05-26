import { Database } from '@/lib/database.types'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseKey || !supabaseUrl) {
  throw new Error('Missing SUPABASE_KEY or URL')
}
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)