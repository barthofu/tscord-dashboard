import { Box, Image, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, HStack, Icon, IconButton, Link, LinkBox, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React, { useContext } from 'react'
import { IoMenuOutline } from "react-icons/io5"

import { HSeparator } from '@components/shared'
import { AdminDashboardContext } from '@core/contexts'
import { BsChevronDown } from 'react-icons/bs'
import { generalConfig } from '@config/general'

type Props = {
    tabs: {
        name: string
        href: string
        icon: React.ReactNode
    }[]
}

const Logo: React.FC = () => {

    const { currentBot, authorizedBots } = useContext(AdminDashboardContext)

    return (

        <Flex align='center' direction='column'>

            <Menu>
                <Flex 
                    w='100%' px={10} mb='1em'
                    direction='row'
                    justify='space-between' align='center' 
                >

                        <Text
                            fontSize='2xl'
                            fontWeight='bold'
                        >
                            {currentBot.name}
                        </Text>

                        <MenuButton as={Box} 
                            position='absolute' 
                            w='80%' h='2.5em' 
                            display='flex' justifyContent='space-between' 
                            cursor='pointer'
                        />
                                
                        <BsChevronDown />

                        <MenuList position='absolute' top='100%'>
                            {authorizedBots.authorized.map(bot => (
                                <MenuItem key={bot.id}>
                                    <LinkBox as={Link} href={`/admin/${bot.id}/monitoring`}>
                                        <Flex>
                                            <Image 
                                                src={bot.iconUrl || generalConfig.dashboard.fallbackBotIconUrl} 
                                                alt='bot avatar'
                                                w='25px' h='25px'
                                                borderRadius='50%'
                                            />
                                            <Text ml={3}>{bot.name}</Text>
                                        </Flex>
                                    </LinkBox>
                                </MenuItem>
                            ))}
                        </MenuList>

                </Flex>
                    </Menu>

                <HSeparator mb='20px' w='80%'/>
            </Flex>

    )
}

const SidebarContent: React.FC<Props> = ({ tabs }) => {

    return (
        <Flex direction='column' height='100%' pt='25px' borderRadius='30px' bg={useColorModeValue('white', 'gray.700')}>

            <Logo />

            <Stack direction='column' mb='auto' mt='8px'>
                
                <Box ps='20px' pe={{ md: '16px', '2xl': '1px' }}>
                <Tabs tabs={tabs} />
                </Box>
            
            </Stack>

        </Flex>
    )
}

const Tabs: React.FC<Props> = ({ tabs }) => {

    const { currentBot } = useContext(AdminDashboardContext)

    const router = useRouter()
    const isActiveTab = (route: string) => router.pathname.includes(route.toLowerCase())

    const activeColor = useColorModeValue('gray.700', 'white')
    const activeIcon = useColorModeValue('brand.500', 'white')
    const textColor = useColorModeValue('secondaryGray.500', 'white')
    const brandColor = useColorModeValue('brand.500', 'brand.400')

    return (<>
        {tabs.map((tab, index) => (

            <Link as={NextLink} href={`/admin/${currentBot.id}/${tab.href}`} key={index}>
                <Box  _hover={{ cursor: 'pointer' }}>
                    <HStack
                        spacing={isActiveTab(tab.href) ? '22px' : '26px'}
                        py='5px'
                        ps='10px'>

                        <Flex w='100%' alignItems='center' justifyContent='center'>

                            <Box color={isActiveTab(tab.href) ? activeIcon : textColor} me='18px'>
                                {tab.icon}
                            </Box>
                            
                            <Text
                                me='auto'
                                color={isActiveTab(tab.href) ? activeColor : textColor}
                                fontWeight={isActiveTab(tab.href) ? 'bold' : 'normal'}
                            >
                                {tab.name}
                            </Text>

                        </Flex>
                        
                        <Box
                            h='36px'
                            w='4px'
                            bg={isActiveTab(tab.href) ? brandColor : 'transparent'}
                            borderRadius='5px'
                        />
                    </HStack>
                </Box>
            </Link>
        ))}
    </>)
}


export const SidebarResponsive: React.FC<Props> = ({ tabs }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    // let btnRef = React.useRef()
  
    return (
        <Flex display={{ sm: 'flex', xl: 'none' }} alignItems='center'>
            <Flex 
                // ref={btnRef} 
                w='max-content' 
                h='max-content' 
                onClick={onOpen}
            >
                <Icon
                    as={IoMenuOutline}
                    color={useColorModeValue('gray.400', 'white')}
                    my='auto'
                    w='20px'
                    h='20px'
                    me='10px'
                    _hover={{ cursor: 'pointer' }}
                />
            </Flex>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement={'left'}
                // finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent w='285px' maxW='285px' bg={useColorModeValue('white', 'navy.800')}>
                    <DrawerCloseButton
                        zIndex='3'
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ boxShadow: 'none' }}
                    />
                    <DrawerBody maxW='285px' px='0rem' pb='0'>
                    {/* <Scrollbars
                        autoHide
                        renderTrackVertical={renderTrack}
                        renderThumbVertical={renderThumb}
                        renderView={renderView}> */}
                        <SidebarContent tabs={tabs} />
                    {/* </Scrollbars> */}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    )

}



export const Sidebar: React.FC<Props> = ({ tabs }) => {

	return (<>
    
        <Box display={['none', null, null, null, 'block']} position='fixed' minH='100%'>
            <Box
                bg={useColorModeValue('white', 'gray.700')}
                transition={'0.2s linear'}
                w='300px'
                h='100vh'
                m={'0'}
                minH='100%'
                overflowX='hidden'
                boxShadow={useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset')}
            >
                {/* <Scrollbars
                    autoHide
                    renderTrackVertical={renderTrack}
                    renderThumbVertical={renderThumb}
                    renderView={renderView}> */}
                <SidebarContent tabs={tabs} />
                {/* </Scrollbars> */}
            </Box>
        </Box>
    </>)
}