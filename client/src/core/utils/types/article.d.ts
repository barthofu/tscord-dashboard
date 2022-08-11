type ArticleMetaData = {
    title: string
    author: string
    coverUrl: string
}

type ArticleData = ArticleMetaData & {
    slug: string
    fileName: string
    content: string
}