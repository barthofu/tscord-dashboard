type ArticleMetaData = {
    title: string
    author?: string
    coverUrl?: string
    description?: string 
}

type ArticleData = ArticleMetaData & {
    slug: string
    fileName: string
    content: string
}