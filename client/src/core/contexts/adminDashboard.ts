import { createContext } from 'react'

type AdminDashboardContextType = {
    currentBot: SanitizededBotConfig
    authorizedBots: BotsState
}

export const AdminDashboardContext = createContext<AdminDashboardContextType>({} as AdminDashboardContextType)