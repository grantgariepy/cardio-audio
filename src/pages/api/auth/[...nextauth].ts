import NextAuth, { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    // async jwt({token, account}){
    //   if (account) {
    //     token.accessToken = account.refresh_token;
    //     return token;
    //   }
    // },
    async session({ session, user }) {
      if (session.user) {
        session.user = user;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
