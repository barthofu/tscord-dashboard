import { Server, Socket } from 'socket.io'
import OnConnectionBot from './connection.bot'
import OnConnectionClient from './connection.client'

export default function OnConnection(io : Server, connections: SocketConnections) {
    io.on('connection', (socket: Socket) => {
        const { type } = socket.handshake.query

        if(type === "bot") {
            OnConnectionBot(socket, connections);
        } else if(type === "client") {
            OnConnectionClient(socket, connections);
        }
    });
}