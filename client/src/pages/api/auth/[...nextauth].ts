import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
        clientId: "",
        clientSecret: ""
      })
  ],
})