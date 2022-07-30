import { botsConfig } from '@config/bots'
import type { GetStaticProps, NextPage } from 'next'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

type Props = {
	botsData: BotsData 
}

const HomePage: NextPage<Props> = ({ botsData }) => {

	const router = useRouter()
	const botId: string = (router.query.bot as string | undefined) || Object.keys(botsData)[0]
	const bot = botsData[botId]

	const { data: session } = useSession()

	return (<>

		{/* <h1>Hello world!</h1>
		{!session && 
			<a 
				href="#" 
				onClick={(e) => { e.preventDefault(); signIn("discord") }}
				className="btn-signin"
			>
				Sign in
			</a>
		}
		{session && <>
			<p style={{ marginBottom: '10px' }}>
				Welcome, {(session.user?.name ?? session.user?.email) ?? "unknow"}
			</p>
			<a 
				href="#" 
				onClick={(e) => { e.preventDefault(); signOut() }}
				className="btn-signin"
			>
				Sign out
			</a>
		</>}  */}
			
	</>)
}

export const getStaticProps: GetStaticProps = async (ctx) => {

	const botsData: BotsData = {}

	for (const { id, apiUrl, apiToken } of botsConfig) {

		try {

			const infoRes = await fetch(new URL('/bot/info?logIgnore=true', apiUrl), {
				headers: { Authorization: `Bearer ${apiToken}` }
			})
			if (!infoRes.ok) throw new Error(infoRes.statusText)
			const info = await infoRes.json()

			const totalsRes = await fetch(new URL('/stats/totals?logIgnore=true', apiUrl), {
				headers: { 'Authorization' : `Bearer ${apiToken}` }
			})
			if (!totalsRes.ok) throw new Error(totalsRes.statusText)
			const totals = await totalsRes.json()
		
			const commandsRes = await fetch(new URL('/bot/commands?logIgnore=true', apiUrl), {
				headers: { 'Authorization' : `Bearer ${apiToken}` }
			})
			if (!commandsRes.ok) throw new Error(commandsRes.statusText)
			const commands = await commandsRes.json()

			botsData[id] = {
				info: {
					name: info.name,
					discriminator: info.discriminator,
					iconUrl: info.iconURL
				},
				totals: totals,
				commands: commands.map((c: any) => ({
					name: c.name,
					description: c.description
				}))
			}

		} catch (err) {
			console.log(err)
		}
	}

	if (Object.keys(botsData).length === 0) throw new Error('No bot is available, couldn\'t generate the home page')

	return {
		props: {
			botsData
		},
		revalidate: 60 * 60 // each 1 hour
	}
}

export default HomePage