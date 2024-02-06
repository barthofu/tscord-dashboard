import { Button, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

type ThemeTogglerProps = Rest

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({ ...rest }) => {

    const { colorMode, toggleColorMode } = useColorMode()

	return (<>
        <Button
            variant='no-hover'
            bg='transparent'
            p='0px'
            minW='unset'
            minH='unset'
            h='18px'
            w='18px'
            onClick={toggleColorMode}
            {...rest}
        >
            <Icon
                me='10px'
                h='100%'
                w='100%'
                color={useColorModeValue("gray.400", "white")}
                as={colorMode === "light" ? IoMdMoon : IoMdSunny}
            />
        </Button>
    </>)
}