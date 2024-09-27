import {
  ContactsRepository,
  ContactCreateData,
  Contacts,
} from "../interfaces/contacts-interface";
import { prisma } from "../database/prisma-client";

export class ContactsRepositoryPrisma implements ContactsRepository {
  async create(data: ContactCreateData): Promise<Contacts> {
    const result = await prisma.contacts.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        userId: data.userId,
      },
    });
    return result;
  }

  async findByEmailorPhone(
    email: string,
    phone: string
  ): Promise<Contacts | null> {
    const result = await prisma.contacts.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone,
          },
        ],
      },
    });
    return result || null;
  }

  async findAllContacts(userId: string): Promise<Contacts[]> {
    const result = await prisma.contacts.findMany({
      where: {
        userId,
      },
    });
    return result;
  }
  async updateContact({ id, name, email, phone }: Contacts): Promise<Contacts> {
    const result = await prisma.contacts.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
      },
    });
    return result;
  }

  async deleteContact(id: string): Promise<Contacts> {
    const result = await prisma.contacts.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
