import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOneOrFail({ relations: ['games'], where: { id: user_id }}); // Complete usando ORM

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = this.repository.query("SELECT * FROM users ORDER BY first_name"); // Complete usando raw query
  
    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const user = this.repository.query(`SELECT first_name, last_name, email FROM users WHERE first_name ILIKE '${first_name}' AND last_name ILIKE '${last_name}'`); // Complete usando raw query

    return user;
  }
}
