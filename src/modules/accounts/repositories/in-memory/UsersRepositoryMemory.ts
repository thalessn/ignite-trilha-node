import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryMemory implements IUsersRepository {
  users: User[] = [];

  constructor() {
    this.users = [];
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name: data.name,
      password: data.password,
      email: data.email,
      driver_license: data.driver_license,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}

export { UsersRepositoryMemory };
