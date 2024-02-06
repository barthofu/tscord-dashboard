type BotConfig = {
    name: string
    iconUrl?: string
    id: string
    apiUrl: string
    apiToken: string
}

type BotsConfig = BotConfig[]

type SanitizededBotConfig = Omit<BotConfig, 'apiUrl' | 'apiToken' | 'secret'>