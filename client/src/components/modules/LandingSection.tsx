import { Text, Box, Container, GridItem, Heading, SimpleGrid, VStack, Flex, Img } from "@chakra-ui/react"
import { useInView } from "react-intersection-observer"
import React, { useEffect } from 'react'
import { ImageResolver, PopBox } from "@elements"

type LandingSectionProps = {
    title: string
    image: string
    alt?: string
    isImgFirst?: boolean
    text?: string
    children?: React.ReactNode
    rest?: Rest
}

export const LandingSection: React.FC<LandingSectionProps> = ({ title, image, alt, isImgFirst, text, children, ...rest }) => {

	return (<>
        <Box as="section" bgColor="gray.800" zIndex="banner">
            <Container position="relative" maxW="container.lg" px={{ base: 8, md: 12 }}>
                <PopBox>
                    <SimpleGrid
                        columns={12}
                        rowGap={{ base: 8, md: 0 }}
                        columnGap={{ base: 0, md: 10, lg: 16 }}
                        w="full"
                    >
                        <GridItem
                            colSpan={{ base: 12, md: 6, lg: 5 }}
                            order={{ base: 1, md: isImgFirst ? 2 : 1 }}
                            w="full"
                        >
                            <VStack
                                spacing={4}
                                py={4}
                                textAlign={{ base: "center", md: "left" }}
                                maxW="330px"
                                alignItems={{ md: "start" }}
                                mx={{ base: "auto", md: "unset" }}
                            >

                                <Heading
                                    as="h3"
                                    fontFamily="Dystopian"
                                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                                >
                                    {title}
                                </Heading>

                                {text ? 
                                    <Text
                                        fontSize={{ base: "lg", lg: "xl" }}
                                        fontWeight="semibold"
                                        color='gray.400'
                                        lineHeight="125%"
                                        w="full"
                                    >
                                    {text}
                                    </Text>
                                : null}

                                {children}
                            </VStack>
                        </GridItem>

                        <GridItem
                            colSpan={{ base: 12, md: 6, lg: 7 }}
                            order={{ base: 2, md: isImgFirst ? 1 : 2 }}
                            w="full"
                            maxW={{ sm: "70%", md: "full" }}
                            justifySelf="center"
                        >
                            <ImageResolver image={<>
                                <Flex>
                                    <Box ml="auto" width={{ base: "80%", md: "full" }} position="relative">
                                        <Img
                                            w="full"
                                            minW="full"
                                            src={image}
                                            alt="Platform-agnostic communities"
                                        />
                                    </Box>
                                </Flex>
                            </>} alt={alt || title} />
                        </GridItem>

                    </SimpleGrid>
                </PopBox>
            </Container>
        </Box>
    </>)
}