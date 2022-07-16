import 'dotenv/config'

import { Server, Socket } from 'socket.io'
import http from 'http'
import onConnection from './events/connection'

const server = http.createServer()
const io = new Server(server, {
    cors: { origin: '*' }
})

const connections: SocketConnections = {
    bots: new Map(),
    clients: new Map()
}

onConnection(io, connections)

server.listen(process.env.PORT, () => console.log('Server has started on port ' + process.env.PORT))