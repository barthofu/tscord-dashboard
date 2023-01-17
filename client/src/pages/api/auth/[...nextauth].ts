import { botsConfig } from "@config/bots"
import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {

    providers: [
        DiscordProvider({
            clientId: process.env['DISCORD_AUTH_ID'],
            clientSecret: process.env['DISCORD_AUTH_SECRET'],
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {

        async jwt({ token, user, account, profile, isNewUser }) {

            if (account?.access_token) token.access_token = account.access_token
            if (user?.id) token.userId = user.id
            return token
        },

        async session({ session, user, token }) {

            if (token.access_token) session.access_token = token.access_token as any
            if (token.userId) session.userId = token.userId as any
            return session
        }
    }
}
export default NextAuth(authOptions)