import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {

  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {

    const userExixts = await this.usersRepository.findOne({
      email
    });

    if (userExixts) {
      return userExixts;
    }

    const user = this.usersRepository.create({
      email
    })

    await this.usersRepository.save(user);

    return user;
  }

  async findByEmail(email: string) {

    const userExixts = await this.usersRepository.findOne({
      email
    });

    return userExixts;
  }
}

export { UsersService };