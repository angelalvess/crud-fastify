import {
  ContactCreate,
  Contacts,
  ContactsRepository,
} from "../interfaces/contacts-interface";
import { UserRepository } from "../interfaces/user.interface";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

export class ContactsUsecase {
  private contactsRepository: ContactsRepository;
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
    this.contactsRepository = new ContactsRepositoryPrisma();
  }

  async create({
    name,
    email,
    phone,
    userEmail,
  }: ContactCreate): Promise<Contacts> {
    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new Error("User not found");
    }

    const verifyIfExistsContact =
      await this.contactsRepository.findByEmailorPhone(email, phone);

    if (verifyIfExistsContact) {
      throw new Error("Contact already exists");
    }

    const contact = await this.contactsRepository.create({
      name,
      email,
      phone,
      userId: user.id,
    });
    return contact;
  }

  async listAllContacts(userEmail: string) {
    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new Error("User not found");
    }

    const contacts = await this.contactsRepository.findAllContacts(user.id);
    return contacts;
  }

  async updateContact({ id, name, email, phone }: Contacts): Promise<Contacts> {
    const data = await this.contactsRepository.updateContact({
      id,
      name,
      email,
      phone,
    });
    return data;
  }

  async deleteContact(id: string): Promise<Contacts> {
    const data = await this.contactsRepository.deleteContact(id);
    return data;
  }
}
