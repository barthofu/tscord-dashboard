type BotState = 'authorized' | 'unauthorized' | 'offline'

type BotsState = {
    authorized: SanitizededBotConfig[]
    unauthorized: SanitizededBotConfig[]
    offline: SanitizededBotConfig[]
}