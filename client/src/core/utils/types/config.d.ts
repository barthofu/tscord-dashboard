type BotConfig = {
    name: string
    id: string
    apiUrl: string
    secret: string
}

type BotsConfig = BotConfig[]

// type BotsConfigEnv = Omit<BotConfig, 'name'>[]

type SanitizededBotsConfig = Omit<BotConfig, 'apiUrl' | 'secret'>[]