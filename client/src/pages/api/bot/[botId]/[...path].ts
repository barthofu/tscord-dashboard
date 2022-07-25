import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { unstable_getServerSession } from "next-auth/next"
import { getSession } from "next-auth/react"
import { authOptions } from '../../auth/[...nextauth]'

const baseURL = process.env['NODE_ENV'] === 'production' ? process.env['BOT_API_URL_PROD'] : process.env['BOT_API_URL_DEV']

const proxyHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('Unauthorized')
        return
    }

    const url = req.query.path instanceof Array ? req.query.path.join('/') : req.query.path
    const token = session.access_token

    const headers = {
        'Authorization': `Bearer ${token}`,
    }

    try {

        const response = await axios({
            url,
            baseURL,
            method: req.method,
            data: req.body,
            params: req.query,
            headers
        })

        return res.json(JSON.stringify(response.data))

    } catch (error) {

        if (error instanceof Error) return res.json(error.message)
    }

}

export default proxyHandler