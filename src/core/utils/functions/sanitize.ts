import { botsConfig } from "@config/bots"

export const getSanitizedBotsConfig = (): SanitizededBotConfig[] => {

    return botsConfig.map(botConfig => ({
        id: botConfig.id,
        name: botConfig.name,
        iconUrl: botConfig.iconUrl
    }))
}

export const getSanitizedBotConfig = (botId: string): SanitizededBotConfig | undefined => {

    const botConfig = botsConfig.find(botConfig => botConfig.id === botId)
    if (!botConfig) {
        return undefined
    }

    return {
        id: botConfig.id,
        name: botConfig.name,
        iconUrl: botConfig.iconUrl
    }
}