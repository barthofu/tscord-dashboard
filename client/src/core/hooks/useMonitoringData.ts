import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { useSocket } from "./useWebSocket"

export const useMonitoringData = () => {

    const {webSocket, bots} = useSocket('ws://localhost:3001')

    const [monitoringData, setMonitoringData] = useState<MonitoringData[] | null>(null)
    const [logs, setLogs] = useState<LogsData[] | null>(null)

    useEffect(() => {

        if (!webSocket) return

        if (bots?.[0]) webSocket.emit('request', { socketId: bots[0].socketId, event: 'getHealth'})

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
        
    }, [webSocket, bots])

    return { monitoringData, logs }
}