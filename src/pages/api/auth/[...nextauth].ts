import { authOptions } from "@/lib/authapp";
import NextAuth from "next-auth/next";

export default NextAuth(authOptions)