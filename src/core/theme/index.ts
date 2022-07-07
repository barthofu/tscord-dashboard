import { extendTheme, ThemeConfig } from "@chakra-ui/react"

import components from './components'
import styles from './styles'
import colors from './colors'
import fonts from './fonts'

const config: ThemeConfig = {

    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    colors,
    fonts,
    styles,
    components
})