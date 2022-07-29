import { botsConfig } from "@config/bots"
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const authorizationCache: Map<string, string[]> = new Map()

const getAuthorizedBotsForUser = async (accessToken: string = '') => {

    const authorizedBots: string[] = []

    for (const { id, apiUrl } of botsConfig) {

        try {
            const response = await fetch(new URL('/bot/test', apiUrl), {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
    
            if (response.status === 200) {
                authorizedBots.push(id)
            }
        } catch (err) {}
    }

    return authorizedBots
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { token } = <{ token: string }>req.query 

    if (!token) {
        res.status(401).send('Unauthorized')
        return
    }
    
    // first, we check in the cache
    let authorizedBots = authorizationCache.get(token)

    // if the access token is not found in cache, we make a request to the bot and update the cache
    if (!authorizedBots) {

        authorizedBots = await getAuthorizedBotsForUser(token)
        
        authorizationCache.set(token, authorizedBots)
        setTimeout(() => {
            authorizationCache.delete(token)
        }, 60 * 60 * 1000) // delete the token from the cache after 1 hour
    }

    res.status(200).json(authorizedBots)
}

export default handler