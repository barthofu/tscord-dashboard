import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

export const useSocket = (url: string) => {
    
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {

    const socketIo = io(url, {
        query: {
            type: 'client'
        }
    })

    setSocket(socketIo)

    return () => { socketIo.disconnect() }

  }, [])

  return socket
}