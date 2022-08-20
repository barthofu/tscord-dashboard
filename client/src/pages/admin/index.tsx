import { HStack, Image, Text } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import { authOptions } from '../api/auth/[...nextauth]'
import { getAbsoluteUrl, getSanitizedBotsConfig } from '@core/utils/functions'
import { BotCard } from '@components/shared'

type Props = {
    bots: SanitizededBotConfig[]
    authorizedBots: { [key: string]: boolean | null }
}

const DashboardPage: NextPage<Props> = ({ bots, authorizedBots }) => {

	return (<>
        {bots.map(bot => (<>
            <BotCard 
                key={bot.id}
                bot={bot}
                authorizedBots={authorizedBots}
            />
        </>))}
	</>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const res = await fetch(getAbsoluteUrl(`/api/bot/allUserAuthorizations?userId=${session.userId}`, ctx.req), { method: 'GET' })
    const authorizedBots = await res.json()

    return {
        props: {
            authorizedBots: authorizedBots,
            bots: getSanitizedBotsConfig()
        }
    }
}

export default DashboardPage