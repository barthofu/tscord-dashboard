import { useContext, useEffect, useState } from "react"

import { useWebSocket } from "@core/hooks"
import { AdminDashboardContext } from "@core/contexts"

export const useMonitoringData = () => {

    const { currentBot } = useContext(AdminDashboardContext)

    const { webSocket, bots } = useWebSocket(process.env['NEXT_PUBLIC_WEBSOCKET_PROXY_URL'])

    const [monitoringData, setMonitoringData] = useState<MonitoringData[] | null>(null)
    const [logs, setLogs] = useState<LogsData[] | null>(null)

    useEffect(() => {

        if (!webSocket) return

        if (bots?.[0]) webSocket.emit('request', { socketId: bots.find(bot => bot.id === currentBot.id)?.socketId, event: 'getHealth'})

        webSocket.on('monitoring', (data: MonitoringData) => {

            data.fetchedAt = new Date()

            setMonitoringData((prev) => {
                if (!prev) return [data]
                else return [...prev.slice(-12), data]
            })
        })
    
        webSocket.on('botDisconnected', () => {
                
            setMonitoringData(null)
        })

        webSocket.on('botConnected', ({ id, name, socketId}: { id: string, name: string, socketId: string}) => {

            webSocket.emit('request', { socketId, event: 'getHealth'})
        })

        webSocket.on('log', (data: LogsData) => {
            
            setLogs((prev) => {
                if (!prev) return [data]
                else return [...prev, data]
            })
        })
        
    }, [webSocket])

    return { monitoringData, logs }
}