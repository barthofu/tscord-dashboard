import { isUserAuthorizedForBot } from "@core/utils/functions"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId, botId } = <{ 
        userId: string, 
        botId: string 
    }>req.query 

    if (!userId) {
        res.status(401).send('Unauthorized')
        return
    }

    // first, we check in the cache
    const isAuthorized = await isUserAuthorizedForBot(userId, botId)

    if (!isAuthorized) res.status(401).send('Unauthorized')
    else res.status(200).send('Authorized')
}

export default handler