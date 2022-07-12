import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { useSocket } from "./useWebSocket"

export const useMonitoringData = () => {

    const socket = useSocket('ws://localhost:3001')

    const [monitoringData, setMonitoringData] = useState<MonitoringData[] | null>(null)
    const [logs, setLogs] = useState<LogsData[] | null>(null)

    useEffect(() => {

        if (!socket) return

        socket.emit('request', 'tscord', 'getHealth')

        socket.on('monitoring', (data: MonitoringData) => {

            data.fetchedAt = new Date()

            setMonitoringData((prev) => {
                if (!prev) return [data]
                else return [...prev.slice(-12), data]
            })
        })
    
        socket.on('botDisconnected', () => {
                
            setMonitoringData(null)
        })

        socket.on('log', (data: LogsData) => {
            
            setLogs((prev) => {
                if (!prev) return [data]
                else return [...prev, data]
            })
        })
        
    }, [socket])

    return { monitoringData, logs }
}