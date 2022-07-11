import { Server, Socket } from 'socket.io'

type QueryType = { 
    botName: string;
    authorized: string[];
    token: string;
}

export default function OnConnectionBot(socket : Socket, connections: SocketConnections) {
    const { botName, authorized, token } = socket.handshake.query as QueryType
    if (!botName || authorized.length === 0 || !token) return;
        
    connections.bots[socket.id] = {
        socket,
        name: botName,
        authorized: authorized
    }
    //console.log('New bot connected: ' + botName)

    socket.on('request', (payload: SocketRequestPayload, ...args) => {
        const clientSocket = connections.clients[payload.socketId]

        if (clientSocket) {
            clientSocket.socket.emit(payload.event, ...args)
        }
    })

    socket.on('disconnect', (reason?: string) => {

        console.log('Bot disconnected: ' + botName)
        delete connections.bots[socket.id]

        //broadcastToClients('botDisconnected', botName)
    })
}