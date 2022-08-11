import { Box, Flex, GridItem, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { HiOutlineCode } from 'react-icons/hi'
import { FaUserFriends } from 'react-icons/fa'
import { SiClubhouse } from 'react-icons/si'

import { TextSideImage } from '@elements'
import { HeroBanner, HomeStat, LandingSection, Commands } from '@modules'
import { HomePageContext } from '@core/contexts'
import { botsConfig } from '@config/bots'

type Props = {
	botData: BotData 
}

const HomePage: NextPage<Props> = ({ botData }) => {

	const { data: session } = useSession()

	return (<>
		<HomePageContext.Provider value={{
			botData
		}}>

			<VStack 
				spacing='10em'
				direction="column"
				justifyContent="center"
				alignItems="center"
				pb='5em'
			>
				<HeroBanner />

				<LandingSection
					title='Platform-agnostic communities'
					image='https://guild.xyz/landing/platform-agnostic-communities.png'
					alt='Test'
					text='Bring your community to your favourite communication platforms, management tools or games.'
				/>

				<LandingSection
					title='Platform-agnostic communities'
					image='https://guild.xyz/landing/platform-agnostic-communities.png'
					alt='Test'
					text='Bring your community to your favourite communication platforms, management tools or games.'
					isImgFirst={true}
				/>

				<LandingSection
					title='Platform-agnostic communities'
					image='https://guild.xyz/landing/platform-agnostic-communities.png'
					alt='Test'
					text='Bring your community to your favourite communication platforms, management tools or games.'
				/>

				<Box>

					<Flex justifyContent="center" alignItems="center" mb='5em'>
						<Heading display='flex' alignItems='center' fontFamily='Dystopian' as="h2" size="2xl" mx='1em'>
							Some stats
						</Heading>
					</Flex>

					<SimpleGrid columns={3} gap={{ base: 6, lg: 20 }}>

						<HomeStat
							label='Guilds'
							value={botData.totals.stats.totalGuilds}
							icon={<SiClubhouse />}
							color='#7A4069'
						/>

						<HomeStat
							label='Users'
							value={botData.totals.stats.totalUsers}
							icon={<FaUserFriends />}
							color='#513252'
						/>

						<HomeStat
							label='Commands'
							value={botData.totals.stats.totalCommands}
							icon={<HiOutlineCode />}	
							color='#CA4E79'
						/>
								
					</SimpleGrid>
				</Box>

				<Box>

					<Flex justifyContent="center" alignItems="center" mb='5em !important'>
						<Heading display='flex' alignItems='center' fontFamily='Dystopian' as="h2" size="2xl" mx='1em'>
							Commands
						</Heading>
					</Flex>

					<Commands 
						commands={botData.commands}
					/>
				</Box>

			</VStack>


		</HomePageContext.Provider>



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

	let botData: BotData

	const { apiUrl, apiToken,  } = botsConfig[0]

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

	botData = {
		info: {
			name: info.user.username,
			discriminator: info.user.discriminator,
			iconUrl: info.user.displayAvatarURL
		},
		totals: totals,
		commands: commands.map((c: any) => ({
			name: c.name,
			description: c.description
		}))
	}

	console.log(botData)

	return {
		props: {
			botData
		},
		revalidate: 24 * 60 * 60 // each 24 hour
	}
}

export default HomePage