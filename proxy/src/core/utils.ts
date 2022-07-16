export function broadcastToClients(clients: Map<string, SocketClient>, authorized: string[], event: string, ...args: any[]) {
    clients.forEach((client) => {
        if (authorized.includes(client.discordId)) {
            client.socket.emit(event, ...args)
        }
    })
}

export function getBotsForUser (userId: string, connections: SocketConnections) {

    return Object
        .values(connections.bots)
        .filter(bot => bot.authorized.includes(userId))
        .map(bot => ({
            id: bot.id,
            name: bot.name,
            socketId: bot.socket.id
        }))
}