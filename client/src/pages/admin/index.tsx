import { HStack, Image, Text } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import { authOptions } from '../api/auth/[...nextauth]'
import { getSanitizedBotsConfig } from '@core/utils/functions'
import { BotCard } from '@elements'

type Props = {
    bots: SanitizededBotConfig[]
    authorizedBots: string[]
}

const DashboardPage: NextPage<Props> = ({ bots, authorizedBots }) => {

	return (<>
        {bots.map(bot => (<>
            <BotCard 
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
            },
        }
    }

    const res = await fetch(`http://localhost:3000/api/bot/authorizedList?token=${session.access_token}`, { method: 'GET' })
    const authorizedBots = await res.json()

    return {
        props: {
            authorizedBots,
            bots: getSanitizedBotsConfig()
        }
    }
}

export default DashboardPage