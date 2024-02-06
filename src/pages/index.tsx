import { Box, Flex, Heading } from '@chakra-ui/react'
import { AvailableBots, LoggedIn, SignIn } from '@components/modules/home'
import { ThemeToggler } from '@components/shared'
import type { NextPage } from 'next'

import { useSession } from 'next-auth/react'
import Head from 'next/head'

const HomePage: NextPage = () => {

	const { data: session } = useSession()

	return (<>

		<Head>
			<title>Dashboard</title>
			<link rel='icon' href='/assets/images/tscord-icon.png'/>
		</Head>

		<Flex w='100%' minH='100vh' justifyContent='center'>

			<ThemeToggler
				position='absolute'
				top='1em' right='1em'
				w='25px' h='25px'
			/>

			<Flex 
				w='50vw' minH='100%' 
				flexDirection='column' 
				justifyContent='center' alignItems='center'
			>

				<Heading as='h1' 
					size='4xl' 
					fontFamily='Mosk'
					mb='1em'	
				>
					Dashboard
				</Heading>
				
				{session ? <>
					<LoggedIn session={session}/>
					<AvailableBots userId={session.userId as string}/>
				</> :
					<SignIn />
				}
			</Flex>
		</Flex>

	</>)
}

export default HomePage