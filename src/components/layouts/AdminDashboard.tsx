import React from 'react'
import { Box } from '@chakra-ui/react'

import { Sidebar, AdminNavbar } from '@components/modules'
import { sidebarConfig } from '@config/sidebar'
import { AdminDashboardContext } from '@core/contexts'
import Head from 'next/head'
import { generalConfig } from '@config/general'

type Props = {
    breadcrumbs: string[]
    bots: SanitizededBotConfig[]
    authorizedBots: BotsState
    currentBot: SanitizededBotConfig
    fixedHeight?: boolean
    children: React.ReactNode
}

export const AdminDashboard: React.FC<Props> = ({ breadcrumbs, bots, authorizedBots, currentBot, fixedHeight, children }) => {

	return (<>

        <Head>
            <title>Dashboard - {currentBot.name}</title>
            <link rel='icon' href={currentBot.iconUrl || generalConfig.dashboard.fallbackBotIconUrl} />
        </Head>

        <AdminDashboardContext.Provider value={{
            currentBot,
            authorizedBots
        }}>
            <Box {...(fixedHeight ? {
                maxH: '100vh',
                overflow: 'hidden'
            } : {} )}>
                <Sidebar tabs={sidebarConfig.tabs}/>
                <Box
                    float='right'
                    minHeight='100vh'
                    height='100%'
                    overflow='auto'
                    position='relative'
                    maxHeight='100%'
                    w={{ base: "100%", xl: "calc( 100% - 300px )" }}
                    maxWidth={{ base: "100%", xl: "calc( 100% - 300px )" }}
                    transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                    transitionDuration='.2s, .2s, .35s'
                    transitionProperty='top, bottom, width'
                    transitionTimingFunction='linear, linear, ease'
                >
                    <AdminNavbar breadcrumbs={breadcrumbs}/>
                    <Box
                        mx='auto'
                        p={{ base: "20px", md: "30px" }}
                        pe='20px'
                        minH='100vh'
                        pt='50px'
                    >
                        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AdminDashboardContext.Provider>
    </>)
}