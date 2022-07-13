import { Socket } from 'socket.io'
import DiscordOauth2 from 'discord-oauth2'

import { getBotsForUser } from '../utils'

const Discord = new DiscordOauth2()

type QueryType = { 
    token: string;
    discordId: string;
}

export default async function OnConnectionClient(socket : Socket, connections: SocketConnections) {

    const { token } = socket.handshake.query as QueryType;
    if (!token) return;
        
    const user = await Discord.getUser(token).catch(() => null);
    if(!user) return;
    
    console.log('New client connected');

    connections.clients[socket.id] = { socket, token, discordId: user.id, destroyTimer: setTimeout(() => {socket.disconnect()}, 86400) };

    socket.emit(
        'botListUpdate',
        getBotsForUser(user.id, connections)
    )

    socket.on('request', (payload: SocketRequestPayload, ...args) => {
        const botSocket = connections.bots[payload.socketId];

        if (botSocket && botSocket.authorized.includes(user.id)) {
            botSocket.socket.emit(payload.event, ...args);
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearTimeout(connections.clients[socket.id].destroyTimer);
        delete connections.clients[socket.id];
    });
}