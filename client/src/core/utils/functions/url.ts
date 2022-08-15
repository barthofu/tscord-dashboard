import { IncomingMessage } from "http"
import absoluteUrl from "next-absolute-url"

export const getAbsoluteUrl = (url: string, req?: IncomingMessage) => {

    if (url.startsWith('http')) return url

    const host = req ? absoluteUrl(req).origin : absoluteUrl().origin

    if (url.startsWith('/')) return `${host}${url}`
    else return `${process.env['BASE_URL']}/${url}`
}