import { botsConfig } from "@config/bots"
import axios from "axios"

export const fetcher = (url: string, args: { [key: string]: any }) => {

    return axios.get(`/api/bot/${botsConfig[0].id}` + url, {
        params: {
            logIgnore: true,
            ...args,
        }
    }).then(res => JSON.parse(res.data))
}
