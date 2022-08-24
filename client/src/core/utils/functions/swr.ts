import { FetchError } from "../classes"
import { getAbsoluteUrl } from "./url"

export const fetcher = async (uri: string, botId?: string, args?: { [key: string]: any }) => {

    // stringify all values of the args object
    if (args) {
        for (const key of Object.keys(args)) {
            args[key] = JSON.stringify(args[key])
        }
    }

    // prepare the elements for the request
    const url = new URL(getAbsoluteUrl(`/api/bot${botId ? `/${botId}` : ''}${uri}`))
    const query = {
        logIgnore: 'true',
        ...args
    }
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key as keyof typeof query]))

    // make the request
    const res = await fetch(url, {
        method: 'GET'
    })

    // handle bad response status 
    if (!res.ok) {
    
        const error = new FetchError('An error occurred while fetching the data.')
        error.info = await res.json()
        error.status = res.status
        throw error
    }

    // return the response json body
    return res.json()

}
