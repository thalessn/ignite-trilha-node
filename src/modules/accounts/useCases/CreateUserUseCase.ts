import { inject } from "tsyringe";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(
    @inject()
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    driver_license,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      driver_license,
      email,
      password,
    });
  }
}

export { CreateUserUseCase };
