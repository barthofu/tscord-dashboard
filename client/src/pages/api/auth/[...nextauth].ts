import { tokenToCSSVar } from "@chakra-ui/react";
import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env['BOT_ID'],
            clientSecret: process.env['BOT_SECRET']
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account?.access_token) token.access_token = account.access_token;
            return token;
        },
        async session({ session, user, token }) {
            if(token.access_token) session.access_token = token.access_token;
            return session;
        }
    }
})