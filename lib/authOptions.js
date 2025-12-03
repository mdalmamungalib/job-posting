import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          image: user.image,
          emailVerified: user.emailVerified,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial login: use returned user
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.status = user.status;
        token.image = user.image;
        token.emailVerified = user.emailVerified;
      } else if (token?.email) {
        // On subsequent requests: refresh from DB
        const freshUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (freshUser) {
          token.id = freshUser.id;
          token.name = freshUser.name;
          token.email = freshUser.email;
          token.role = freshUser.role;
          token.status = freshUser.status;
          token.image = freshUser.image;
          token.emailVerified = freshUser.emailVerified;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          status: token.status,
          image: token.image,
          emailVerified: token.emailVerified,
        };
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        // Include accounts relation to check linked providers
        const prismaUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (prismaUser) {
          // If user has password and Google account is NOT linked, block Google login
          const hasGoogleAccount = prismaUser.accounts.some(
            (acc) => acc.provider === "google"
          );
          if (prismaUser.password && !hasGoogleAccount) {
            return "/login?error=UsePassword";
          }

          // Link Google account if not linked yet
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: { userId: prismaUser.id },
            create: {
              userId: prismaUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              id_token: account.id_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              session_state: account.session_state,
            },
          });

          return true;
        } else {
          // No user exists, create new one for Google login
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              image: user.image || "",
              role: "USER",
              emailVerified: true,
              accounts: {
                create: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  id_token: account.id_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  session_state: account.session_state,
                },
              },
            },
          });

          return true;
        }
      }
      return true; // For other providers or credentials
    },
  },
  events: {
    async createUser({ user }) {
      // Check if the user has a Google account
      const account = await prisma.account.findFirst({
        where: { userId: user.id, provider: "google" },
      });
      if (account) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: true },
        });
      }
    },
  },
};
