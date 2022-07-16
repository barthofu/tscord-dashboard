import { Socket } from 'socket.io'

import { broadcastToClients, getBotsForUser } from '../core/utils'
import { connections } from '../core/store'

type QueryType = { 
    botName: string
    botId: string
    authorized: string[]
    token: string
}

function updateBotList(socket: Socket) {

    socket.emit(
        'botListUpdate', 
        getBotsForUser(socket.id, connections)
    )
}

export default function registerBotHandlers(socket : Socket) {

    const { botName, botId, authorized, token } = socket.handshake.query as QueryType
    if (!botName || !botId || authorized.length === 0 || !token) return
        
    connections.bots.set(socket.id, {
        socket,
        name: botName,
        id: botId,
        authorized: authorized
    })

    console.log('New bot connected: ' + botName)

    broadcastToClients(
        connections.clients, 
        authorized, 
        'botConnected', 
        { id: botId, name: botName, socketId: socket.id }
    )

    updateBotList(socket)

    socket.on('request', (payload: SocketRequestPayload, ...args) => {
        
        if (payload.socketId === 'broadcast') broadcastToClients(connections.clients, authorized, payload.event, ...args)
        else {
            const client = connections.clients.get(payload.socketId)
            if (client) {
                client.socket.emit(payload.event, ...args)
            }
        }
    })

    socket.on('disconnect', (reason?: string) => {

        connections.bots.delete(socket.id)
        
        console.log('Bot disconnected: ' + botName)
        
        broadcastToClients(connections.clients, authorized, 'botDisconnected', botId)

        updateBotList(socket)

    })
}