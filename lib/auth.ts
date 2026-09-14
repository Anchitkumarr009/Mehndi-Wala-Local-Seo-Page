import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@mehndiwalaa.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const expectedEmail = process.env.ADMIN_EMAIL || "admin@mehndiwalaa.com";
        const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (
          credentials?.email?.toLowerCase().trim() === expectedEmail.toLowerCase().trim() &&
          credentials?.password === expectedPassword
        ) {
          return {
            id: "1",
            name: "Mehndi Wala Admin",
            email: expectedEmail,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "mehndi-wala-super-secret-key-2026-secure",
};
