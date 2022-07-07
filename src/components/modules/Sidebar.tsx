import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, HStack, Icon, Link, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'
import React from 'react'
import { IoMenuOutline } from "react-icons/io5"

import { HSeparator } from '@elements'

type Props = {
    tabs: {
        name: string
        href: string
        icon: React.ReactNode
    }[]
}

const Logo: React.FC = () => {

    return (
        <Flex align='center' direction='column'>
            <Text
                fontSize='2xl'
                fontWeight='bold'
                mb='1em'
            >TSCord Template</Text>
            <HSeparator mb='20px' />
        </Flex>
    )
}

const SidebarContent: React.FC<Props> = ({ tabs }) => {

    return (
        <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>

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

    const router = useRouter()
    const isActiveTab = (route: string) => router.pathname.includes(route.toLowerCase())

    const activeColor = useColorModeValue('gray.700', 'white')
    const activeIcon = useColorModeValue('brand.500', 'white')
    const textColor = useColorModeValue('secondaryGray.500', 'white')
    const brandColor = useColorModeValue('brand.500', 'brand.400')

    return (<>
        {tabs.map((tab, index) => (

            <Link as={NextLink} href={tab.href} key={index}>
                <Box>
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
    
        <Box display={{ sm: 'none', xl: 'block' }} position='fixed' minH='100%'>
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