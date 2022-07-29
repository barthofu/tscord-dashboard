import { botsConfig, getSanitizedBotsConfig } from "@config/bots"
import { Session } from "next-auth"

const cache: Map<string, string[]> = new Map()

export const adminDashboardServerSideProps = async (botId: string, session: Session | null) => {

    if (!session) return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
    const { access_token: token } = <Session & { access_token: string }>session 

    let authorized = false

    // first, we check in the cache 
    if (cache.get(token)?.includes(botId)) authorized = true
    else {
        // if the access token is not found in cache, we make a request to the bot and update the cache
        try {
            const response = await fetch(new URL('/bot/test', botsConfig.find(bot => bot.id === botId)?.apiUrl), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if (response.status === 200) {

                authorized = true

                const currCache = cache.get(token) || []
                cache.set(token, [...currCache, botId])
                    setTimeout(() => {
                        const currCache = cache.get(token)
                        if (currCache) cache.set(token, currCache.filter(el => el !== botId))
                    }, 60 * 60 * 1000) // delete the token from the cache after 1 hour
                }
        } catch (err) {}
    }

    if (!authorized) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    
    return {
        props: {
            session,
            bots: getSanitizedBotsConfig(),
            currentBot: getSanitizedBotsConfig().find(bot => bot.id === botId)
        }
    }
}