import { Avatar, Button, Flex, Icon, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md"
import { IoMdMoon, IoMdSunny } from "react-icons/io"
import NextLink from 'next/link'

import { SidebarResponsive } from '@modules'
import { sidebarConfig } from '@config/sidebar'

type Props = {}

export const AdminNavbarLinks: React.FC<Props> = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    let menuBg = useColorModeValue("white", "navy.800");
    const navbarIcon = useColorModeValue("gray.400", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );

	return (<>
        <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems='center'
            flexDirection='row'
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

            <Menu>
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
            </Menu>

            {/* Dark/Light mode toggler button */}

            <Button
                variant='no-hover'
                bg='transparent'
                p='0px'
                minW='unset'
                minH='unset'
                h='18px'
                w='max-content'
                onClick={toggleColorMode}
            >
                <Icon
                    me='10px'
                    h='18px'
                    w='18px'
                    color={navbarIcon}
                    as={colorMode === "light" ? IoMdMoon : IoMdSunny}
                />
            </Button>

            {/* User */}

            <Menu>

                <MenuButton p='0px'>
                    <Avatar
                        _hover={{ cursor: "pointer" }}
                        color='white'
                        name='Bartholomé Gili'
                        bg='#11047A'
                        size='sm'
                        w='40px'
                        h='40px'
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
                            👋&nbsp; Hey, Bartholomé
                        </Text>
                    </Flex>

                    <Flex flexDirection='column' p='10px'>

                        <MenuItem
                            _hover={{ bg: "none" }}
                            _focus={{ bg: "none" }}
                            borderRadius='8px'
                            px='14px'
                        >
                            <Text fontSize='sm'>Profile Settings</Text>
                        </MenuItem>

                        <MenuItem
                            _hover={{ bg: "none" }}
                            _focus={{ bg: "none" }}
                            color='red.400'
                            borderRadius='8px'
                            px='14px'
                        >
                            <Text fontSize='sm'>Log out</Text>
                        </MenuItem>

                    </Flex>

                </MenuList>

            </Menu>
            
        </Flex>
    </>)
}