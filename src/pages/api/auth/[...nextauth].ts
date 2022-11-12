
import NextAuth, { NextAuthOptions } from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";
import { env
 } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  providers: [
    // Passwordless / email sign in
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-top-read',
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({session , user }) {
      return session;
    },
  },
  
}
export default NextAuth(authOptions)