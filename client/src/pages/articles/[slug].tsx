import { getAbsoluteUrl } from "@core/utils/functions"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"

type ArticlePageProps = {
    article: ArticleData
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {

    return (<>
        <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={ChakraUIRenderer()}
        >
            {article.content}
        </ReactMarkdown>
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