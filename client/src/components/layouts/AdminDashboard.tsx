import React from 'react'
import { Box } from '@chakra-ui/react'

import { Sidebar, AdminNavbar } from '@modules'
import { sidebarConfig } from '@config/sidebar'
import { AdminDashboardContext } from '@core/contexts'

type Props = {
    breadcrumbs: string[]
    bots: SanitizededBotConfig[]
    currentBot: SanitizededBotConfig
    children: React.ReactNode
}

export const AdminDashboard: React.FC<Props> = ({ breadcrumbs, bots, currentBot, children }) => {

	return (<>
        <AdminDashboardContext.Provider value={{
            currentBot
        }}>
            <Box>
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