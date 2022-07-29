import { botsConfig } from "@config/bots"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { unstable_getServerSession } from "next-auth/next"
import { getSession } from "next-auth/react"
import { authOptions } from '../../auth/[...nextauth]'
import { URLSearchParams } from 'url' 
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
        console.log(options)

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

    // try {

    //     const response = await axios({
    //         url,
    //         baseURL,
    //         method: req.method,
    //         data: req.body,
    //         params: req.query,
    //         headers
    //     })

    //     return res.json(JSON.stringify(response.data))

    // } catch (error) {

    //     // console.log(error)
    //     if (error instanceof Error) return res.json(error.message)
    // }

}

export default proxyHandler