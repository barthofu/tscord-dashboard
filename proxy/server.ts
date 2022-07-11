import { Server, Socket } from 'socket.io'
import http from 'http'

const serverPort = 3001

type ConnectionsType = {
    bots: { [key: string]: Socket },
    clients: { [key: string]: Socket }
}

const connections: ConnectionsType = {
    bots: {},
    clients: {}
}

const server = http.createServer()
const io = new Server(server, {
    cors: { origin: '*' }
})

io.on('connection', (socket: Socket) => {

    const { type } = socket.handshake.query

    if (type === 'bot') {

        const { botName } = socket.handshake.query
        if (!botName) {
            socket.disconnect()
            return
        }
            
        connections.bots[botName as string] = socket
        console.log('New bot connected: ' + botName)

        socket.on('request', (socketId: string, event: string, ...args) => {

            if (socketId === 'all') {
                    
                for (const clientSocket of Object.values(connections.clients)) {
                    clientSocket.emit(event, ...args)
                }
            }
            else {

                const clientSocket = connections.clients[socketId]
    
                if (clientSocket) {
                    clientSocket.emit(event, ...args)
                }
            }
        })
    } 
    else if (type === 'client') {

        connections.clients[socket.id] = socket
        console.log('New client connected')

        socket.on('request', (botName: string, event: string, ...args) => {
            
            const botSocket = connections.bots[botName]

            if (botSocket) {
                botSocket.emit(event, socket.id, ...args)
            }
        })
    }
    
})

server.listen(serverPort, () => {
    console.log('Server has started on port ' + serverPort)
})