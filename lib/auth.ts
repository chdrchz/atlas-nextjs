import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { fetchUser } from "./data";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials: { email: string; password: string }) => {
        const { email, password } = credentials;
        const user = await fetchUser(email);
        if (!user) return null; //@ts-ignore
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
  callbacks: {},
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    theme: {
      brandColor: "#1ED2AF",
      logo: "/logo.png",
      buttonText: "#ffffff",
    },
    providers: [
      Credentials({ ... }),
    ],
    callbacks: {
      authorized: async ({ auth }) => {
        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth;
      },
    },
  });
