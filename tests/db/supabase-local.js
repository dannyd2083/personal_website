import { execSync } from 'node:child_process'
import { createClient } from '@supabase/supabase-js'

// Local-stack URL and keys come from `supabase status`, so nothing secret is stored in files.
let keys = null
function localKeys() {
    if (keys) return keys
    const status = JSON.parse(execSync('supabase status -o json', { encoding: 'utf8' }))
    keys = {
        url: status.API_URL,
        anonKey: status.ANON_KEY,
        serviceKey: status.SERVICE_ROLE_KEY,
    }
    if (!keys.url || !keys.anonKey || !keys.serviceKey) {
        throw new Error('Local Supabase is not running. Run `supabase start` first.')
    }
    return keys
}

const noSession = { auth: { persistSession: false, autoRefreshToken: false } }

export function anonClient() {
    const { url, anonKey } = localKeys()
    return createClient(url, anonKey, noSession)
}

export function serviceClient() {
    const { url, serviceKey } = localKeys()
    return createClient(url, serviceKey, noSession)
}

const TEST_PASSWORD = 'local-test-password-123'

export async function createUserClient(email) {
    const { data, error } = await serviceClient().auth.admin.createUser({
        email,
        password: TEST_PASSWORD,
        email_confirm: true,
    })
    if (error) throw error

    const client = anonClient()
    const { error: signInError } = await client.auth.signInWithPassword({ email, password: TEST_PASSWORD })
    if (signInError) throw signInError

    return { client, userId: data.user.id }
}

export async function deleteUser(userId) {
    const { error } = await serviceClient().auth.admin.deleteUser(userId)
    if (error) throw error
}
