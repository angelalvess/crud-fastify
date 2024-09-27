import { FastifyInstance } from "fastify";
import { ContactCreate } from "../interfaces/contacts-interface";
import { ContactsUsecase } from "../usecases/contacts.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Contacts } from "@prisma/client";

export async function contactsRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactsUsecase();

  fastify.addHook("preHandler", authMiddleware);
  fastify.post<{ Body: ContactCreate }>("/", async (req, reply) => {
    const { name, email, phone } = req.body;
    const emailUser = req.headers["email"];

    try {
      const data = await contactUseCase.create({
        name,
        email,
        phone,
        userEmail: emailUser,
      });

      reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.get("/", async (req, reply) => {
    const emailUser = req.headers["email"];

    try {
      const data = await contactUseCase.listAllContacts(emailUser);
      reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.put<{ Body: Contacts; Params: { id: string } }>(
    "/:id",
    async (req, reply) => {
      const { id } = req.params;

      const { name, email, phone } = req.body;

      try {
        const data = await contactUseCase.updateContact({
          id,
          name,
          email,
          phone,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
    const { id } = req.params;

    try {
      const data = await contactUseCase.deleteContact(id);
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
