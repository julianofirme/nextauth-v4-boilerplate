import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIEND_ID
  const clientSecret = process.env.GOOGLE_CLIEND_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error("Missins GOOGLE_CLIENT_ID")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missins GOOGLE_CLIENT_SECRET")
  }

  return {
    clientId,
    clientSecret
  }
}

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({ where: { id: user?.id } });

      if (!dbUser) {
        if (user) {
          token.id = user!.id;
        }

        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    redirect() {
      return '/dashboard'
    }
  },
}