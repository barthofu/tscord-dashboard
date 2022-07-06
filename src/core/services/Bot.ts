import { singleton } from "tsyringe"
import Axios, { AxiosInstance } from "axios"

@singleton()
export class Bot {

    private _axios: AxiosInstance

    constructor() {

        this._axios = Axios.create({
            baseURL: process.env['NODE_ENV'] === 'production' ? process.env['BOT_API_URL_PROD'] : process.env['BOT_API_URL_DEV'],
            headers: {
                'Authorization': `Bearer ${process.env['BOT_API_TOKEN']}`
            }
        })
    }

    get axios(): AxiosInstance {
        return this._axios
    }

}