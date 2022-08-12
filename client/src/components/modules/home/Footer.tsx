import { Box, Container, GridItem, HStack, Link, SimpleGrid, Stack, Text, VStack} from '@chakra-ui/react'
import React from 'react'

const getTextStroke = (px: number = 1) => {

    return `-${px}px -${px}px 0 #fff, 1px -${px}px 0 #fff, -${px}px 1px 0 #fff, 1px 1px 0 #fff`
} 

const LogoText: React.FC<{ children: React.ReactNode } & Rest> = ({ children, ...rest }) => {

    return <Text
        as='h3'
        fontSize='4xl'
        fontWeight='bolder'
        fontFamily='Archivo Black, sans-serif'
        color='white'
        mb='-1em !important' 
        {...rest}
    >
        {children}
    </Text>
}

const FooterLink: React.FC<{ href: string, children: React.ReactNode } & Rest> = ({ href, children, ...rest }) => {

    return <Link
        href={href}
        fontSize={{ base: "xl", lg: "2xl" }}
        fontWeight="bold"
        fontFamily="Dystopian"
        whiteSpace="nowrap"
        {...rest}
    >
        {children}
    </Link>
}

type FooterProps = {}

export const Footer: React.FC<FooterProps> = () => {

	return (<>
        <Box
            position="relative"
            w="full"
            bgImage="url('/assets/images/fire.svg')"
            bgSize="auto 8rem"
            bgRepeat="repeat-x"
            bgPosition="bottom center"
            bgColor="gray.800"
        >
            <Container
                maxW="container.lg"
                px={{ base: 8, lg: 10 }}
                pt={{ base: 16, lg: 28 }}
                pb={{ base: 48, lg: 64 }}
            >
                <HStack justifyContent='space-around' alignItems='center' h='full'>

                    <VStack flexDirection='column-reverse' alignItems='start' textShadow='dark-lg'>
                        <LogoText color='gray.800' textShadow={getTextStroke(.5)} opacity='0.25'>Slash Commands</LogoText>
                        <LogoText color='gray.800' textShadow={getTextStroke(.5)} opacity='0.5'>Slash Commands</LogoText>
                        <LogoText color='gray.800' textShadow={getTextStroke(.5)} opacity='0.75'>Slash Commands</LogoText>
                        <LogoText zIndex='1' mb='-1.25em !important'>Slash Commands</LogoText>
                    </VStack>

                    <Stack
                        spacing={{ base: 0, md: 8 }}
                        direction={{ base: "column", md: "row" }}
                        alignItems="center"
                        justifyContent={{ base: "center", md: "end" }}
                    >
                        <FooterLink href='https://github.com/barthofu/tscord-template' isExternal>
                            github
                        </FooterLink>
                        <FooterLink href='' isExternal>
                            support server
                        </FooterLink>
                    </Stack>
                </HStack>
            </Container>
        </Box>
    </>)
}