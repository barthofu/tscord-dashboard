import { Box, Link, useColorModeValue, Image, Stack, Heading, Text, Flex, Button, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import { Card, PopBox } from '@components/shared'

const MotionBox = motion(Box)

type LatestArticlesProps = {
    articles: ArticleData[]
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({ articles }) => {

    const [sectionHeight, setSectionHeight] = useState<'80vh' | 'auto'>('80vh')

	return (<>
        <MotionBox
            position="relative"
            initial={{
                height: "80vh",
            }}
            animate={{ height: sectionHeight }}
            overflow="hidden"
            maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }}
        >
            <PopBox
                gap={{ base: 6, lg: 8 }}
                mt={{ base: -2, md: -4 }}
                sx={{
                    columnCount: [1, 1, 2],
                    breakInside: "avoid",
                }}
            >
                {articles.map((article, i) => (<>
                    <ArticlePreview key={i} article={article} />
                </>))}
                
            </PopBox>

            <MotionBox
                position="absolute"
                inset={-1}
                bgGradient="linear-gradient(to top, var(--chakra-colors-gray-800), rgba(39, 39, 42, 0))"
                zIndex="1"
                pointerEvents="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: sectionHeight === "auto" ? 0 : 1 }}
            />

        </MotionBox>

        <Flex alignItems="center" justifyContent="center" mt='5em' z-index='1'>
            <Button
                mb={8}
                onClick={() => setSectionHeight(sectionHeight !== "auto" ? "auto" : "80vh")}
                rightIcon={sectionHeight !== "auto" ? <IoIosArrowDown /> : <IoIosArrowUp />}
            >
                {sectionHeight !== "auto" ? "Show more" : "Show less"}
            </Button>
        </Flex>
    </>)
}

type ArticlePreviewProps = {
    article: ArticleData
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {

    return (<>
        <Link
            as={NextLink}
            key={article.slug}
            href={`/articles/${article.slug}`}
            w="full"
            _hover={{ textDecoration: "none" }}
            cursor='pointer'
        >
            <Card
                cursor='pointer'
                role="group"
                my={{ base: 2, md: 3, lg: 4 }}
                w="full"
                transition='background 0.5s linear'
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700'), transition: 'background 0.5s linear' }}
                flexDirection='column'
                justifyContent='start'
                alignItems='center'
                p={0}
                borderRadius='2xl'
                overflow="hidden"
            >
                {article.coverUrl && (
                    <Image
                        w="full"
                        src={article.coverUrl}
                        alt={article.title}
                        _groupHover={{ opacity: 0.8 }}
                        borderTopLeftRadius="2xl"
                        borderTopRightRadius="2xl"
                    />
                )}
                <Stack px={{ base: 5, sm: 6 }} py={7}>
                    <Heading as="h4" fontSize="xl" fontFamily="Dystopian" my='.5em'>
                        {article.title}
                    </Heading>
                    {article.description && (
                        <Text 
                            opacity='0.6'
                            fontFamily='Inter var,Inter,sans-serif !important'
                            fontWeight='semibold'
                        >
                            {article.description}
                        </Text>
                    )}
                </Stack>
            </Card>
        </Link>
    </>)
}