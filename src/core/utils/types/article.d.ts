type ArticleMetaData = {
    title: string
    author?: string
    authorUrl?: string
    coverUrl?: string
    description?: string 
    date?: string
}

type ArticleData = ArticleMetaData & {
    slug: string
    fileName?: string
    content: string
}