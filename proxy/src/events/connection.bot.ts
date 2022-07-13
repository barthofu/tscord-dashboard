import { Socket } from 'socket.io'
import { broadcastToClients } from '../utils';

type QueryType = { 
    botName: string;
    botId: string;
    authorized: string[];
    token: string;
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
    broadcastToClients(connections.clients, authorized, 'botConnected', { id: botId, name: botName, sockerId: socket.id });

    socket.on('request', (payload: SocketRequestPayload, ...args) => {
        const clientSocket = connections.clients[payload.socketId];

        if (clientSocket) {
            clientSocket.socket.emit(payload.event, ...args);
        }
    })

    socket.on('disconnect', (reason?: string) => {
        console.log('Bot disconnected: ' + botName);
        delete connections.bots[socket.id];

        broadcastToClients(connections.clients, authorized, 'botDisconnected', botId);
    });
}