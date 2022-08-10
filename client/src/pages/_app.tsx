import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import '@fontsource/dm-sans'
import '@styles/main.scss'
import '@styles/fonts.scss'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@core/theme'

function App({ Component, pageProps }: AppProps) {

	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	)
}

export default App