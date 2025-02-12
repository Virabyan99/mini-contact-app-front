
export const runtime = 'edge'; // Ensure this is at the top

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Your NextAuth configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.NEXT_AUTH_GITHUB_ID || "",
      clientSecret: process.env.NEXT_AUTH_GITHUB_SECRET || "",
    }),
  ],
});
