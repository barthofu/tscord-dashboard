import { Socket } from 'socket.io'
import { broadcastToClients, getBotsForUser } from '../utils';

type QueryType = { 
    botName: string;
    botId: string;
    authorized: string[];
    token: string;
}

function updateBotList(socket: Socket, connections: SocketConnections) {
    socket.emit(
        'botListUpdate', 
        getBotsForUser(socket.id, connections)
    )
}

export default function OnConnectionBot(socket : Socket, connections: SocketConnections) {
    const { botName, botId, authorized, token } = socket.handshake.query as QueryType;
    if (!botName || !botId || authorized.length === 0 || !token) return;
        
    connections.bots[socket.id] = {
        socket,
        name: botName,
        id: botId,
        authorized: authorized
    };

    console.log('New bot connected: ' + botName);

    broadcastToClients(
        connections.clients, 
        authorized, 
        'botConnected', 
        { id: botId, name: botName, socketId: socket.id }
    );

    updateBotList(socket, connections)

    socket.on('request', (payload: SocketRequestPayload, ...args) => {
        
        if (payload.socketId === 'broadcast') broadcastToClients(connections.clients, authorized, payload.event, ...args);
        else {
            const client = connections.clients[payload.socketId];
            if (client) {
                client.socket.emit(payload.event, ...args);
            }
        }

    })

    socket.on('disconnect', (reason?: string) => {

        console.log('Bot disconnected: ' + botName);
        delete connections.bots[socket.id];

        broadcastToClients(connections.clients, authorized, 'botDisconnected', botId)

        updateBotList(socket, connections)

    })
}