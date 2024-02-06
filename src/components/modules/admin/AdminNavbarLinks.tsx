import React from 'react'
import { Image, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'

import { SidebarResponsive } from '@components/modules'
import { sidebarConfig } from '@config/sidebar'
import { ThemeToggler } from '@components/shared'

const signOutHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    signOut()
}

type Props = {}

export const AdminNavbarLinks: React.FC<Props> = () => {

    const { data: session } = useSession()

    let menuBg = useColorModeValue("white", "gray.800");
    const navbarIcon = useColorModeValue("gray.400", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.04)"
    );

	return (<>
        <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems='center'
            flexDirection='row'
            justifyContent='space-between'
            bg={menuBg}
            flexWrap="unset"
            p='10px'
            borderRadius='30px'
            boxShadow={shadow}
        >

            {/* Searchbar */}

            {/* <SearchBar
                mb={secondary ? { base: "10px", md: "unset" } : "unset"}
                me='10px'
                borderRadius='30px'
            /> */}

            {/* Sidebar toggler (when screen width is too small) */}

            <SidebarResponsive tabs={sidebarConfig.tabs} />

            {/* Notifications */}

            {/* <Menu>
                <MenuButton p='0px'>
                    <Icon
                        mt='6px'
                        as={MdNotificationsNone}
                        color={navbarIcon}
                        w='18px'
                        h='18px'
                        me='10px'
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p='20px'
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'
                    mt='22px'
                    me={{ base: "30px", md: "unset" }}
                    minW={{ base: "unset", md: "400px", xl: "450px" }}
                    maxW={{ base: "360px", md: "unset" }}
                >

                    <Flex justify='space-between' w='100%' mb='20px'>
                        <Text fontSize='md' fontWeight='600' color={textColor}>
                            Notifications
                        </Text>
                        <Text
                            fontSize='sm'
                            fontWeight='500'
                            color={useColorModeValue("brand.700", "brand.400")}
                            ms='auto'
                            cursor='pointer'
                        >
                            Mark all read
                        </Text>
                    </Flex>

                </MenuList>
            </Menu> */}

            {/* Dark/Light mode toggler button */}

            <ThemeToggler mx='1em !important'/>

            {/* User */}

            <Menu>

                <MenuButton p='0px'>
                    <Image
                        src={session?.user?.image || undefined}
                        alt={session?.user?.name || undefined}
                        w='40px'
                        h='40px'
                        borderRadius='50%'
                    />
                </MenuButton>

                <MenuList
                    boxShadow={shadow}
                    p='0px'
                    mt='10px'
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'
                >
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor={useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)")}
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}
                        >
                            👋&nbsp; Hey, {session?.user?.name}
                        </Text>
                    </Flex>

                    <Flex flexDirection='column' p='10px'>

                        <MenuItem
                            _hover={{ bg: "none" }}
                            _focus={{ bg: "none" }}
                            color='red.400'
                            borderRadius='8px'
                            px='14px'
                            onClick={signOutHandler}
                        >
                            <Text fontSize='sm'>Log out</Text>
                        </MenuItem>

                    </Flex>

                </MenuList>

            </Menu>
            
        </Flex>
    </>)
}