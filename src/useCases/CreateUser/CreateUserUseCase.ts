//Camada interna da nossa aplicação UseCase

//SOLID
//Single Responsibility Principle - Um único arquivo uma única regra de negócio que detem como criar um usuário dentro da minha aplicação
//Liskov Substitution Principle - Recebe uma interface IUsersRespository um contrato que defini os métodos que serão enviados
//Dependente Inversion Principle - Não pedendo da implementação de uma classe para o funcionamento

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository, //Define a variável usersRepository como privada sem a necessidade de ter cria-la no escopo (No TypeScript)
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
        to:{
            name: data.name,
            email: data.email
        },
        from: {
            name: "Equipe do Meu App",
            email: "equipe@meuapp.com"
        },
        subject: "Seja bem-vindo à plataforma",
        body: "<p>Você já pode fazer o login na plataforma</p>"
    })
  }
}
