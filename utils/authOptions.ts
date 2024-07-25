import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import env from "@/utils/validateEnv";
import connectDB from "@/config/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        console.log("Cannot connect");
        return false;
      } else {
        await connectDB();
        const userExists = await User.findOne({ email: profile.email })
        if (!userExists) {
          let image;
          if (!("picture" in profile)) {
            image = "/profile.png"
          } else {
            image = profile.picture;
          }
          const username = profile.name?.slice(0, 20);
          const defaultChar = generateDefault(8);
          await User.create({
            email: profile.email,
            image: image,
            default: defaultChar,
            profile: {
              name: username,
              displayname: `${username}-${defaultChar}`,
            }
          })
        }
      }
      return true;
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email })
      session.user.id = user._id.toString();
      return session;
    }
  }
}
