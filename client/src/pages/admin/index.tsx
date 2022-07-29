import { getSanitizedBotsConfig } from '@config/bots'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'

type Props = {
    bots: SanitizededBotConfig[]
    authorizedBots: string[]
}

const DashboardPage: NextPage<Props> = ({ bots, authorizedBots }) => {

	return (<>
        {bots.map(bot => (<>
            [${authorizedBots.includes(bot.id) ? 'authorized' : 'unauthorized'}] {bot.name} ({bot.id})
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