import type { NextApiRequest, NextApiResponse } from "next"
import matter from 'gray-matter'
import fs from 'fs'

import { articlesConfig } from "@config/articles"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { slug } = req.query
    if (!slug) {
        res.status(400).json({ message: 'Missing slug' })
        return
    }

    const filePath = `${articlesConfig.path}/${slug}`
    let fileContent: string
    try {
        fileContent = fs.readFileSync(filePath + '.md', 'utf8')
    } catch (e) {
        try {
            fileContent = fs.readFileSync(filePath + '.mdx', 'utf8')
        }
        catch (e) {
            res.status(404).json({ message: 'Article not found' })
            return
        }
    }

    const { data, content } = matter(fileContent)
    
    const article = {
        slug,
        content,
        ...data
    }

    res.status(200).json(article)
}

export default handler