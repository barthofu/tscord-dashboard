import { Socket } from 'socket.io'
import DiscordOauth2 from 'discord-oauth2'

import { getBotsForUser } from '../core/utils'
import { connections } from '../core/store'

const Discord = new DiscordOauth2()

type QueryType = { 
    token: string
    discordId: string
}

export default async function registerClientHandlers(socket : Socket) {

    const { token } = socket.handshake.query as QueryType
    if (!token) return
        
    const user = await Discord.getUser(token).catch(() => null)
    if(!user) return
    
    console.log('New client connected: ' + user.username)

    connections.clients.set(socket.id, { 
        socket, 
        token, 
        discordId: user.id, 
        destroyTimer: setTimeout(() => {
            socket.disconnect()
        }, 24 * 60 * 60 * 1000) 
    })

    socket.emit(
        'botListUpdate',
        getBotsForUser(user.id, connections)
    )

    socket.on('request', (payload: SocketRequestPayload, ...args) => {
        
        const botSocket = connections.bots.get(payload.socketId)

        if (botSocket && botSocket.authorized.includes(user.id)) {
            botSocket.socket.emit(payload.event, ...args)
        }
    })

    socket.on('disconnect', (reason: string) => {

        console.log('Client disconnected :', reason)
        clearTimeout(connections.clients.get(socket.id)?.destroyTimer)
        connections.clients.delete(socket.id)
    })
}