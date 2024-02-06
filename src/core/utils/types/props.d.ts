type Rest = {
    [x: string]: any
}

type AdminDashboardProps = {
    bots: SanitizededBotConfig[]
    authorizedBots: BotsState
    currentBot: SanitizededBotConfig
}