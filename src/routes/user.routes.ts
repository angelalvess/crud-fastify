import { fastify, FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export function userRoutes(fastify: FastifyInstance) {
  const useUserCase = new UserUseCase();

  fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
    const { name, email } = req.body;

    try {
      const data = await useUserCase.create({ name, email });
      reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
