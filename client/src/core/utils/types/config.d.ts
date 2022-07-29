type BotConfig = {
    id: string
    name: string
    avatar?: string | null
    apiUrl: string
    secret: string
}

type BotsConfig = BotConfig[]

type SanitizededBotConfig = Omit<BotConfig, 'apiUrl' | 'secret'>