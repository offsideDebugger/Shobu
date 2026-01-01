import type{ FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { findMatches } from "../queues/matchingQueue";

export function matchUsers(first:string,second:string){
    console.log("2 users found and matched")
    console.log(`User 1 is : ${first}`)
    console.log(`User 2 is : ${second}`)
}
export default async function matchRoutes(fastify:FastifyInstance){


    fastify.get("/api/findmatch", async(req:FastifyRequest,reply:FastifyReply)=>{
        const userId=(req.query as { userId: string }).userId;
        console.log(userId)
        const idQueued=await findMatches(userId);
        
        reply.send({
            status:"Id received",
            message:idQueued,
            userId:userId,
            state:"matching"
        })
    })

    
}

