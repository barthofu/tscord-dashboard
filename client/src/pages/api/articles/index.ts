import type { NextApiRequest, NextApiResponse } from "next"
import matter from 'gray-matter'
import fs from 'fs'

import { articlesConfig } from "@config/articles"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const files = fs.readdirSync(articlesConfig.path).filter(file => !file.startsWith('.') || !file.startsWith('_'))

    const articles = files.map((fileName: string) => {

        const slug = fileName.replace(/\.mdx?$/, '')

        const filePath = `${articlesConfig.path}/${fileName}`
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        
        return {
            slug,
            fileName,
            content,
            ...data
        }
    })

    res.status(200).json(articles)
}

export default handler