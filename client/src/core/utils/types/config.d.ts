type BotConfig = {
    id: string
    name: string
    iconUrl?: string
    apiUrl: string
    apiToken: string
    secret: string
}

type BotsConfig = BotConfig[]

type SanitizededBotConfig = Omit<BotConfig, 'apiUrl' | 'apiToken' | 'secret'>