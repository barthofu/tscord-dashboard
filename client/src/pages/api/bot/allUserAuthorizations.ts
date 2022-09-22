import type { NextApiRequest, NextApiResponse } from "next"

import { getAuthorizedBotsForUser } from "@core/utils/functions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId } = <{ userId: string }>req.query 

    if (!userId) {
        res.status(400).send('Bad request: missing `userId` query parameter')
        return
    }

    let authorizedBots = await getAuthorizedBotsForUser(userId.replace(/"/g, ''))

    res.status(200).json(authorizedBots)
}

export default handler