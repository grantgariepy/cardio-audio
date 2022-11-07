
import NextAuth from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";

const options = {
  providers: [
    // Passwordless / email sign in
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-top-read',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.display_name,
      //     email: profile.email,
      //     image: profile.images?.[0]?.url
      //   }
      // },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user, token) {
      session.user = user;
      return session;
    },
  },
  // Optional SQL or MongoDB database to persist users
  database: process.env.DATABASE_URL
}

export default (req, res) => NextAuth(req, res, options);