export function broadcastToClients(clients: { [key: string]: SocketClient }, authorized: string[], event: string, ...args: any[]) {
    Object.values(clients)
        .filter(client => authorized.includes(client.discordId))
        .forEach(client => client.socket.emit(event, ...args));
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