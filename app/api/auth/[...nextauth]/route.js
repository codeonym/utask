import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { connectToDB } from "@utils/connectDB"
import User from '@models/User'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.email.split('@')[0].toLowerCase(),
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {

        profile = {
          id: profile.id,
          name: profile.name,
          email: profile.email ?? '',
          image: profile.avatar_url,
          username: profile.login,
        }
        return profile
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Create token if it doesn't exist
      if (!token) token = {};

      if (user) {
        token.email = user.email;
        token.username = user.username;
        token.image = user.image;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {

      // Check if token is defined before accessing properties
      if (token && token.email) {
        const sessionUser = await User.findOne({
          email: token.email
        });

        if (sessionUser) {
          session.user.email = token.email;
          session.user.username = token.username;
          session.user.image = token.image;
          session.user.accessToken = token.accessToken;
          session.user.id = sessionUser._id.toString();
        }
      }
      return session;
    },
    async signIn({ user }) {
      try {
        // Connect to MongoDB
        await connectToDB()

        // Check if the user already exists
        const userExists = await User.findOne({
          username: user.username
        })

        // If not, create a new user
        if (!userExists) {
          console.log("Creating user");
          await User.create({
            email: user.email,
            username: user.username,
            image: user.image,
          })
        }
        return true
      } catch (e) {
        console.log("Error: " + e);
        return false;
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
