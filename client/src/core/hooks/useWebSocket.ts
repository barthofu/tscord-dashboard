import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

export const useSocket = (url: string) => {
		
	const [webSocket, setWebSocket] = useState<Socket | null>(null)
	const [bots, setBots] = useState<BotsList>([])

	const session = useSession()

	useEffect(() => {

		if (!session) return

		if (webSocket) webSocket.disconnect()

		const socketIo = io(url, {
			query: {
				type: 'client',
				token: session.data?.access_token
			}
		})

		setWebSocket(socketIo)

		return () => { socketIo.disconnect() }

	}, [session])

	useEffect(() => {

		if (!webSocket) return

		webSocket.on('botListUpdate', (bots) => {
			setBots(bots)
		})

	}, [webSocket])

	return { webSocket, bots }
}