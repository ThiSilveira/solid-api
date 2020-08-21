import { PostgressUsersRepository } from "../../repositories/implementations/PostgressUsersRepository";
import { MailTrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const postgresUsersRepository = new PostgressUsersRepository();
const mailtrapMailProvider = new MailTrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
