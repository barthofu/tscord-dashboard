import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const baseURL = process.env['NODE_ENV'] === 'production' ? process.env['BOT_API_URL_PROD'] : process.env['BOT_API_URL_DEV']

export const useAPI = {

    GET: async (endpoint: string, params?: any) => {

        const [data, setData] = useState<any>()

        const session = useSession()
    
        useEffect(() => {

            if (!session.data) return

            

        }, [session])
    }
}