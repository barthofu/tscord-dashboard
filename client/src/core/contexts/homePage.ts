import { createContext } from 'react'

type HomePageContextType = {
    botData: BotData
}

export const HomePageContext = createContext<HomePageContextType>({} as HomePageContextType)