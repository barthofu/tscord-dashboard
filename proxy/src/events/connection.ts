import { Server, Socket } from 'socket.io'
import onConnectionBot from './connection.bot'
import onConnectionClient from './connection.client'

export default function onConnection(io : Server, connections: SocketConnections) {

    io.on('connection', (socket: Socket) => {

        const { type } = socket.handshake.query

        if (type === "bot") onConnectionBot(socket, connections)
        else if (type === "client") onConnectionClient(socket, connections)
    })
}