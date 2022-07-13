export function broadcastToClients(clients: { [key: string]: SocketClient }, authorized: string[], event: string, ...args: any[]) {
    Object.values(clients)
        .filter(client => authorized.includes(client.discordId))
        .forEach(client => client.socket.emit(event, ...args));
}