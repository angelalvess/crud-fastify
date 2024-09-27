export interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId?: string;
}

export interface ContactCreate {
  name: string;
  email: string;
  phone: string;
  userEmail: string;
}

export interface ContactCreateData {
  name: string;
  email: string;
  phone: string;
  userId: string;
}

export interface ContactsRepository {
  create(data: ContactCreateData): Promise<Contacts>;
  findByEmailorPhone(email: string, phone: string): Promise<Contacts | null>;
  findAllContacts(userId: string): Promise<Contacts[]>;
  updateContact({ id, name, email, phone }: Contacts): Promise<Contacts>;
  deleteContact(id: string): Promise<Contacts>;
}
