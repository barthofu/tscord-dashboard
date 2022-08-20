import { botsConfig } from "@config/bots"
import { getAbsoluteUrl, getSanitizedBotsConfig } from "@core/utils/functions"
import { IncomingMessage } from "http"
import { Session } from "next-auth"

export const adminDashboardServerSideProps = async (botId: string, session: Session | null, req: IncomingMessage) => {

    if (!session) return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
    
    try {
        const response = await fetch(getAbsoluteUrl(`/api/bot/${botId}/userAuthorization?userId=${session.userId}`, req), { method: 'GET' })

        if (response.status !== 200) {
            throw new Error()
        }
    } catch (err) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session,
            bots: getSanitizedBotsConfig(),
            currentBot: getSanitizedBotsConfig().find(bot => bot.id === botId)
        }
    }
}