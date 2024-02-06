import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'

import '@fontsource/dm-sans'
import '@styles/fonts.scss'
import '@styles/main.scss'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@core/theme'
import { Session } from 'next-auth'

function App({ Component, pageProps }: AppProps<{
	session: Session
}>) {

	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	)
}

export default App