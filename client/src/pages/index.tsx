import { Box, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { HiOutlineCode } from 'react-icons/hi'
import { FaUserFriends } from 'react-icons/fa'
import { SiClubhouse } from 'react-icons/si'
import matter from 'gray-matter'
import fs from 'fs'

import { HeroBanner, HomeStat, LandingSection, Commands, LatestArticles, Footer } from '@components/modules'
import { HomePageContext } from '@core/contexts'
import { botsConfig } from '@config/bots'
import { articlesConfig } from '@config/articles'

type Props = {
	botData: BotData
	articles: ArticleData[]
}

const HomePage: NextPage<Props> = ({ botData, articles }) => {

	return (<>
		<HomePageContext.Provider value={{
			botData
		}}>

			<VStack 
				spacing='10em'
				direction="column"
				justifyContent="center"
				alignItems="center"
				overflowX="hidden"
				overflowY="scroll"
				sx={{
				  perspective: "2px",
				  transformStyle: "preserve-3d",
				  scrollBehavior: "smooth",
				}}
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

				<Box>

					<Flex justifyContent="center" alignItems="center" mb='5em !important'>
						<Heading display='flex' alignItems='center' fontFamily='Dystopian' as="h2" size="2xl" mx='1em'>
							Discover latest news
						</Heading>
					</Flex>

					<LatestArticles
						articles={articles}
					/>
				</Box>

				<Footer />

			</VStack>


		</HomePageContext.Provider>

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

    const files = fs.readdirSync(articlesConfig.path).filter(file => !file.startsWith('.') || !file.startsWith('_'))

    const articles = files.map((fileName: string) => {

        const slug = fileName.replace(/\.mdx?$/, '')

        const filePath = `${articlesConfig.path}/${fileName}`
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        const article = {
            slug,
            fileName,
            content,
            ...data
        } as ArticleData

        return article
    })

	return {
		props: {
			botData,
			articles
		},
		revalidate: 24 * 60 * 60 // each 24 hour
	}
}

export default HomePage