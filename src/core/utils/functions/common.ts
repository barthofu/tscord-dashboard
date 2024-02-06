import { getAbsoluteUrl, getSanitizedBotsConfig } from "@core/utils/functions"
import { IncomingMessage } from "http"
import { Session } from "next-auth"

const redirection = {
    redirect: {
        destination: '/',
        permanent: false,
    }
}


export const adminDashboardServerSideProps = async (botId: string, session: Session | null, req: IncomingMessage) => {

    if (!session) return redirection
    
    try {

        const response = await fetch(getAbsoluteUrl(`/api/bot/allUserAuthorizations?userId=${session.userId}`), { method: 'GET' })
        if (!response.ok) throw new Error()

        const authorizedBots = await response.json() as BotsState
        if (!authorizedBots.authorized.find(bot => bot.id === botId)) throw new Error()

        return {
            props: {
                session,
                bots: getSanitizedBotsConfig(),
                authorizedBots: authorizedBots,
                currentBot: getSanitizedBotsConfig().find(bot => bot.id === botId)
            }
        }

    } catch (err) {
        return redirection
    }
}