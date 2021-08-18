import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUseUseCase";

let usersRepositoryMemory: UsersRepositoryMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryMemory = new UsersRepositoryMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryMemory);
  });

  it("Should be able to authenticate", async () => {
    const user: ICreateUserDTO = {
      name: "Thales",
      email: "teste@gmail.com",
      password: "1234",
      driver_license: "12BD",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Shouldn't be able to authenticate when the user not exists", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "teste@g.com",
        password: "1",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Shouldn't be able to authenticate with the wrong password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Thales",
        email: "teste@gmail.com",
        password: "1234",
        driver_license: "12BD",
      };

      await createUserUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: "passwordIncorrect",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
