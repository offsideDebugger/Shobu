import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { findMatches } from "../queues/matchingQueue";

export default async function matchRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/findmatch",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const userId = (req.query as { userId: string }).userId;
      console.log(userId);
      const idQueued = await findMatches(userId);

      reply.send({
        status: "Id received",
        message: idQueued,
        userId: userId,
        state: "matching",
      });
    },
  );
}
