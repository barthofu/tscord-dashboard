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

const broadcastToClients = (event: string, ...args: any[]) => {
    for (const clientSocket of Object.values(connections.clients)) {
        clientSocket.emit(event, ...args)
    }
}

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

            if (socketId === 'broadcast') {
                    
                broadcastToClients(event, ...args)
            }
            else {

                const clientSocket = connections.clients[socketId]
    
                if (clientSocket) {
                    clientSocket.emit(event, ...args)
                }
            }
        })

        socket.on('disconnect', (reason?: string) => {

            console.log('Bot disconnected: ' + botName)
            delete connections.bots[botName as string]

            broadcastToClients('botDisconnected', botName)
        })
    } 
    else if (type === 'client') {

        if (connections.clients[socket.id]) return
        
        connections.clients[socket.id] = socket
        console.log('New client connected')

        socket.on('request', (botName: string, event: string, ...args) => {
            
            const botSocket = connections.bots[botName]

            if (botSocket) {
                botSocket.emit(event, socket.id, ...args)
            }
        })

        socket.on('disconnect', () => {

            console.log('Client disconnected')
            delete connections.clients[socket.id]
        })
    }
    
})

server.listen(serverPort, () => {
    console.log('Server has started on port ' + serverPort)
})