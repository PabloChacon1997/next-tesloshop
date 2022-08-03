import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'Ej: andres@correo.com'
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        },
      },
      async authorize(credentials) {
        console.log({credentials});
        // return { name: 'Andrés', email: 'andres@correo.com', role: 'admin' };
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      }
    })
  ],

  // Callbacks
  callbacks: {
    async jwt({token, account, user}) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oauthToBeUser( user?.email || '',user?.name || '' );
            break;
          case 'credentials':
            token.user = user;
            break;
        
          default:
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    }
  }
});