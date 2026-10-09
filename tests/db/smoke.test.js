import { describe, it, expect } from 'vitest'
import { anonClient } from './supabase-local.js'

describe('local supabase', () => {
    it('lets an anonymous visitor read places', async () => {
        const { error } = await anonClient().from('places').select('id')
        expect(error).toBeNull()
    })
})
