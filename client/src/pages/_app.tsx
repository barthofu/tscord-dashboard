import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import '@fontsource/dm-sans'
import '@styles/main.scss'
import '@styles/fonts.scss'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@core/theme'
import { ParallaxProvider } from 'react-scroll-parallax'

function App({ Component, pageProps }: AppProps) {

	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<ParallaxProvider>
					<Component {...pageProps} />
				</ParallaxProvider>
			</ChakraProvider>
		</SessionProvider>
	)
}

export default App