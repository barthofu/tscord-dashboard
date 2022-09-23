import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

export const useWebSocket = (url: string) => {

	console.log('useWebSocket', url)
		
	const [webSocket, setWebSocket] = useState<Socket | null>(null)
	const [bots, setBots] = useState<BotsList>([])

	const componentWillUnmount = useRef(false)

	const session = useSession()

	useEffect(() => {
		return () => {
			componentWillUnmount.current = true
		}
	}, [])

	useEffect(() => {

		if (!session.data || webSocket) return
		
		const socketIo = io(url, {
			query: {
				type: 'client',
				token: session.data?.access_token
			}
		})

		setWebSocket(socketIo)

	}, [session])

	useEffect(() => {

		if (!webSocket) return

		webSocket.on('botListUpdate', (bots) => {
			setBots(bots)
		})

		return () => {
			if (componentWillUnmount.current) {
				webSocket.disconnect()
				setWebSocket(null)
			}
		}

	}, [webSocket])

	return { webSocket, bots }
}