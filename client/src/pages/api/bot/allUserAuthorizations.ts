import type { NextApiRequest, NextApiResponse } from "next"

import { authorizationCache } from "@core/utils/cache"
import { getAuthorizedBotsForUser } from "@core/utils/functions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId } = <{ userId: string }>req.query 

    if (!userId) {
        res.status(401).send('Unauthorized')
        return
    }

    let authorizedBots = await getAuthorizedBotsForUser(userId)

    res.status(200).json(authorizedBots)
}

export default handler