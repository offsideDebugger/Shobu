import type { FastifyReply, FastifyRequest } from "fastify";

export default function HealthRoute(req:FastifyRequest,reply:FastifyReply){
    reply.send("Hi User")
}