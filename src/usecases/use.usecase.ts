import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

export class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ name, email }: UserCreate): Promise<User> {
    const verifyEmail = await this.userRepository.findByEmail(email);
    if (verifyEmail) {
      throw new Error("Email already exists");
    }

    const result = await this.userRepository.create({ name, email });
    return result;
  }
}
