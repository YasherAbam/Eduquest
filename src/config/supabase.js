import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Create a single instance of the Supabase client
let supabaseInstance = null

export const getSupabase = () => {
    if (!supabaseInstance) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: true,
                storageKey: 'eduquest-auth',
                autoRefreshToken: true,
                detectSessionInUrl: true
            },
            global: {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            },
            realtime: {
                params: {
                    eventsPerSecond: 10
                }
            }
        })
    }
    return supabaseInstance
}

export const supabase = getSupabase()

export default supabase