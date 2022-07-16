import 'dotenv/config'

import { Server, Socket } from 'socket.io'
import http from 'http'

import registerBotHandlers from './handlers/bot'
import registerClientHandlers from './handlers/client'

const server = http.createServer()
const io = new Server(server, {
    cors: { origin: '*' }
})

function onConnection(socket: Socket) {

    const { type } = socket.handshake.query

    if (type === "bot") registerBotHandlers(socket)
    else if (type === "client") registerClientHandlers(socket)
    else socket.disconnect()
}

io.on('connection', onConnection)

server.listen(process.env.PORT, () => console.log('Server has started on port ' + process.env.PORT))