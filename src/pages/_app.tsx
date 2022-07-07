import 'reflect-metadata'
import type { AppProps } from 'next/app'

import '@fontsource/dm-sans'
import '@styles/main.scss'

import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { theme } from '@core/theme'

function App({ Component, pageProps }: AppProps) {

	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default App