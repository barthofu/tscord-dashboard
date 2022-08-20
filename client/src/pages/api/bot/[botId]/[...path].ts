import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth/next"

import { authOptions } from '../../auth/[...nextauth]'
import { botsConfig } from "@config/bots"
import { FetchError } from "@core/utils/classes"

const proxyHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('Unauthorized')
        return
    }

    const { path, botId } = req.query
    
    // sanitize query params
    delete req.query.path
    delete req.query.botId

    const uri = path instanceof Array ?path.join('/') : path as string
    const baseURL = botsConfig.find(botConfig => botConfig.id === botId)?.apiUrl.replace(/\/+$/, '')
    if (!baseURL) {
        res.status(404).send('Bot not found')
        return
    }

    // create the url from the baseURL and the uri, and set the query params
    const url = new URL(uri, baseURL)
    Object.keys(req.query).forEach(key => url.searchParams.append(key, <string>req.query[key]))
    
    // authorization
    const token = session.access_token
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }

    try {

        const options = {
            method: req.method,
            headers,
            ...(req.method === 'POST' || req.method === 'PUT') ? { body: req.body } : {},
        }

        const response = await fetch(url, options)

        // get the response json body while handling errors
        if (response.status === 200) {
            const json = await response.json()
            res.status(response.status).send(json)
            return
        } else {
            const error = new FetchError(await response.text())
            error.status = response.status
            error.info = await response.json()
            throw error
        }

    } catch (err) {

        if (err instanceof Error) {
            res.status(500).send(err.message)
            return
        }
    }

}

export default proxyHandler