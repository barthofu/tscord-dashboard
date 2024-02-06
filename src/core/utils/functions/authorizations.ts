import { authorizationCache } from "@core/utils/cache"
import { getSanitizedBotsConfig } from "./sanitize"

export const getAuthorizedBotsForUser = async (userId: string) => {

    const authorizedBots: BotsState = {
        authorized: [],
        unauthorized: [],
        offline: []
    }
    const cacheData = await authorizationCache.get()
    const sanitizededBotConfig = getSanitizedBotsConfig()

    for (const bot of sanitizededBotConfig) {

        let type: 'authorized' | 'unauthorized' | 'offline'
        if (!cacheData.get(bot.id)) type = 'offline'
        else if (cacheData.get(bot.id)!.includes(userId)) type = 'authorized'
        else type = 'unauthorized'  

        authorizedBots[type].push(bot)
    }

    return authorizedBots
}

export const isUserAuthorizedForBot = async (userId: string, botId: string) => {

    const authorizedBots = await getAuthorizedBotsForUser(userId)

    return authorizedBots.authorized.find(bot => bot.id === botId)
}