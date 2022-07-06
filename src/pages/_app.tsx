import 'reflect-metadata'
import type { AppProps } from 'next/app'

import '@styles/main.scss'

import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { theme } from '@core/theme'

const extendedTheme = extendTheme(theme)

function App({ Component, pageProps }: AppProps) {

	return (
		<ChakraProvider theme={extendedTheme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default App