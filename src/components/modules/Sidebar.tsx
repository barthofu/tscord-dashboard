import { Box, Flex, HStack, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { HSeparator } from '@elements'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    tabs: {
        name: string
        href: string
        icon: string
    }[]
}

const Logo: React.FC = () => {

    return (
        <Flex align='center' direction='column'>
            <HSeparator mb='20px' />
        </Flex>
    )
}

const Tabs: React.FC<Props> = ({ tabs }) => {

    const router = useRouter()
    const isActiveTab = (route: string) => router.pathname.includes(route.toLowerCase())

    const activeColor = useColorModeValue('gray.700', 'white')
    const inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600')
    const activeIcon = useColorModeValue('brand.500', 'white')
    const textColor = useColorModeValue('secondaryGray.500', 'white')
    const brandColor = useColorModeValue('brand.500', 'brand.400')

    return (<>
        {tabs.map((tab, index) => (

            <Link as={Link} to={tab.href} key={index}>
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
                <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>

                    <Logo />

                    <Stack direction='column' mb='auto' mt='8px'>
                        
                        <Box ps='20px' pe={{ md: '16px', '2xl': '1px' }}>
                        <Tabs tabs={tabs} />
                        </Box>
                    
                    </Stack>

                </Flex>
                {/* </Scrollbars> */}
            </Box>
        </Box>
    </>)
}