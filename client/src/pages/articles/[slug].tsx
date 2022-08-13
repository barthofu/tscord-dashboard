import { getAbsoluteUrl } from "@core/utils/functions"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import Link from "next/link"

type ArticlePageProps = {
    article: ArticleData
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {

    return (<>
        <Flex w='full' flexDirection='column' alignItems='center' justifyContent='center' py='5em'>

            <Link href='/'>
                <Text 
                    fontSize='3xl' 
                    mb='1em' 
                    color='gray.200' 
                    cursor='pointer'
                    transition='.2s linear'
                    _hover={{ opacity: '.7' }}
                >
                    <AiFillHome />
                </Text>
            </Link>

            <Box 
                w='60vw' 
                bg='gray.700'
                borderRadius='2xl'
                overflow='hidden'
            >
                {article.coverUrl &&
                    <Image
                        src={article.coverUrl}
                        alt={article.title}
                        width='100%'
                        maxH='300px'
                        objectFit='cover'
                        sx={{
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                        }}
                    >

                    </Image>
                }

                <Box p='2em 4em 4em 4em'>

                    <Text as='h1' fontSize='5xl' fontWeight='bold'>
                        {article.title}
                    </Text>
                    <Text as='h3' fontSize='lg' fontWeight='regular' mb='2em' opacity='.7' fontStyle='italic'>
                        By {article.authorUrl ? 
                                <Text as='a' 
                                    href={article.authorUrl} 
                                    color='#fff' fontWeight='semibold'
                                    _hover={{
                                        textDecoration: 'underline',
                                    }}    
                                >{article.author}</Text>
                            : article.author
                        }
                        {article.date && ` - ${article.date}`}
                    </Text>

                    <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                        components={ChakraUIRenderer()}
                    >
                        {article.content}
                    </ReactMarkdown>
                </Box>
            </Box>
        </Flex>
    </>)
}

export default ArticlePage

export const getStaticProps: GetStaticProps = async ({ params })=> {

    const { slug } = params!

    const articleRes = await fetch(getAbsoluteUrl(`/api/articles/${slug}`))
    if (!articleRes.ok) throw new Error("Article not found")
    const article = await articleRes.json()

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    const articlesRes = await fetch(getAbsoluteUrl('/api/articles'))
    const articles: ArticleData[] = await articlesRes.json()

    const paths = articles.map(article => ({
        params: {
            slug: article.slug
        }
    }))

    return {
        paths,
        fallback: false
    }
}