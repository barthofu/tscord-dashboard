interface SocketBot {
    socket: Socket;
    name: string;
    id: string;
    authorized: string[];
}

interface SocketClient {
    socket: Socket;
    token: string;
    discordId: string;
    destroyTimer: NodeJS.Timeout;
}

interface SocketConnections {
    bots: {
        [key: string]: SocketBot
    };
    clients: {
        [key: string]: SocketClient
    }
}

interface SocketRequestPayload {
    socketId: string;
    event: string;
}