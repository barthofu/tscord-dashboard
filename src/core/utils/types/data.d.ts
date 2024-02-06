type MonitoringData = {

    fetchedAt: Date
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
    },
    latency: {
        ping: number
    }
}

type LogsData = {
    info: string
    message: string
}

type BotData = {
    info: {
        name: string
        discriminator: string
        iconUrl: string
    }
    totals: {
        stats: {
            totalUsers: number
            totalGuilds: number
            totalActiveUsers: number
            totalCommands: number
        }
    }
    commands: {
        name: string
        description: string
    }[]
}

type BotsData = {
	[key: string]: BotData
} 
