import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "../services/db";
export const auth = betterAuth({
    baseURL:"http://localhost:4000/",
    trustedOrigins: ["http://localhost:4000", "https://localhost:5173"],
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
        twitter: { 
            clientId: process.env.TWITTER_CLIENT_ID as string, 
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string, 
        }, 
    },
    database:prismaAdapter(prisma,{
        provider:"postgresql"
    })
});