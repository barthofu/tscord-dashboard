import { authorizationCache } from "@core/utils/cache"

export const getAuthorizedBotsForUser = async (userId: string) => {

    const authorizedBots: { [key: string]: boolean | null } = {}
    const cacheData = await authorizationCache.get()

    cacheData.forEach((authorizedUsers, botId) => {

        if (!authorizedUsers) authorizedBots[botId] = null
        else authorizedBots[botId] = authorizedUsers.includes(userId)
    })

    return authorizedBots
}

export const isUserAuthorizedForBot = async (userId: string, botId: string) => {

    const authorizedBots = await getAuthorizedBotsForUser(userId)

    return authorizedBots[botId] === true
}