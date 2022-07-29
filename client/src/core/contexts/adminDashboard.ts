import { createContext } from 'react'

type AdminDashboardContextType = {
    currentBot: SanitizededBotConfig
}

export const AdminDashboardContext = createContext<AdminDashboardContextType>({} as AdminDashboardContextType)