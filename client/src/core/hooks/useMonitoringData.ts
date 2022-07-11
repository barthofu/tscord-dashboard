import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

type MonitoringData = {

    botStatus: {
        online: boolean
        uptime: number | null
        maintenance: boolean
    }
    host: {
        cpu: number
        memory: {
            freeMemPercentage: number
            usedMemPercentage: number
        }
        os: string
        uptime: number
        hostname: string
        platform: string
    }
    pid: {
        memory: {
            usedInMb: number
            percentage: number
        }
        cpu: number
        ppid: number
        pid: number
        ctime: number
        elapsed: number
        timestamp: number
    }
}

let socket: Socket

export const useMonitoringData = () => {

    const [monitoringData, setMonitoringData] = useState<MonitoringData[] | null>(null)

    useEffect(() => {

        socket = io('ws://localhost:3001', {
            query: {
                type: 'client'
            }
        })

        socket.emit('request', 'tscord', 'getHealth')

        socket.on('monitoring', (data: MonitoringData) => {

            setMonitoringData((prev) => {
                if (!prev) return [data]
                else return [...prev, data]
            })

            console.log(monitoringData?.length)
        })
    
        socket.on('botDisconnected', () => {
                
            setMonitoringData(null)
        })
        
    }, [])

    return monitoringData
}