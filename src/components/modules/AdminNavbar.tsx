import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link, useColorModeValue } from '@chakra-ui/react'
import { AdminNavbarLinks } from '@modules'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {
    breadcrumbs: string[]
}

export const AdminNavbar: React.FC<Props> = ({ breadcrumbs }) => {

    const [scrolled, setScrolled] = useState(false)
    const toggleScroll = () => setScrolled(window.scrollY > 1)

    useEffect(() => {

        window.addEventListener('scroll', toggleScroll)
        return () => window.removeEventListener('scroll', toggleScroll)
    }, [])

    const mainText = useColorModeValue('navy.700', 'white'),
          secondaryText = useColorModeValue('gray.700', 'white')

	return (<>
        
        <Box
            position='fixed'
            boxShadow='none'
            bg={useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)')}
            borderColor='transparent'
            filter='none'
            backdropFilter='blur(20px)'
            backgroundPosition='center'
            backgroundSize='cover'
            borderRadius='16px'
            borderWidth='1.5px'
            borderStyle='solid'
            transitionDelay='0s, 0s, 0s, 0s'
            transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
            transition-property='box-shadow, background-color, filter, border'
            transitionTimingFunction='linear, linear, linear, linear'
            alignItems={{ xl: 'center' }}
            display='flex'
            minH='75px'
            justifyContent={{ xl: 'center' }}
            lineHeight='25.6px'
            mx='auto'
            mt='0px'
            pb='8px'
            right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
            px={{
                sm: '15px',
                md: '10px',
            }}
            ps={{
                xl: '12px',
            }}
            pt='8px'
            top={{ base: '12px', md: '16px', xl: '18px' }}
            w={{
                base: 'calc(100vw - 6%)',
                md: 'calc(100vw - 8%)',
                lg: 'calc(100vw - 6%)',
                xl: 'calc(100vw - 350px)',
                '2xl': 'calc(100vw - 365px)',
            }}
        >
            <Flex
                w='100%'
                flexDirection={{ sm: 'column', md: 'row' }}
                alignItems={{ xl: 'center' }}
                mb='0px'
            >
                
                <Box mb={{ sm: '8px', md: '0px' }}>

                    <Breadcrumb>
                        <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
                            <BreadcrumbLink href='#' color={secondaryText}>
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {breadcrumbs.map((breadcrumb, index) => (
                            <BreadcrumbItem color={secondaryText} fontSize='sm' key={index}>
                                <BreadcrumbLink href='#' color={secondaryText}>
                                    {breadcrumb}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumb>

                    {/* Here we create navbar brand, based on route name */}
                    <Link
                        as={NextLink}
                        color={mainText}
                        href='#'
                        bg='inherit'
                        borderRadius='inherit'
                        fontWeight='bold'
                        fontSize='34px'
                        _hover={{ color: { mainText } }}
                        _active={{ bg: 'inherit', transform: 'none', borderColor: 'transparent' }}
                        _focus={{ boxShadow: 'none' }}
                    >
                        {breadcrumbs.slice(-1)[0]}
                    </Link>

                </Box>

                <Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
                    <AdminNavbarLinks
                        // onOpen={props.onOpen}
                        // logoText={props.logoText}
                        // secondary={props.secondary}
                        // fixed={props.fixed}
                        // scrolled={scrolled}
                    />
                </Box>
            </Flex>
        </Box>
    </>)
}