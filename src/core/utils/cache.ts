import { botsConfig } from "@config/bots"

export const authorizationCache: {
    data: Map<string, string[] | null> | null
    get: () => Promise<Map<string, string[] | null>>
    refresh: () => Promise<void>
    invalidate: () => void
} = {
    
    data: null,

    get: async function () {
        if (!this.data) {
            await this.refresh()
            return this.data!
        }
        return this.data
    },

    refresh: async function () {

        this.data = new Map()

        for (const { id, apiUrl, apiToken } of botsConfig) {
    
            try {
                const response = await fetch(new URL('/bot/devs?logIgnore=true', apiUrl), {
                    headers: { 'Authorization': `Bearer ${apiToken}` }
                })
       
                if (response.status === 200) {
                    const devs: string[] = await response.json()    
                    this.data.set(id, devs) 
                }
                else throw new Error()
            
            } catch (err) {
                this.data.set(id, null)
            }
        }

        // invalidate the cache after 30min
        setTimeout(() => {
            this.invalidate()
        }, 30 * 60 * 1000)
    },

    invalidate: function () {
        this.data = null
    }

}