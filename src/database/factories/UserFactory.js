import { getConnection } from 'typeorm';
import faker from '@faker-js/faker';
import Factory from './Factory.js';
import RoleFactory from './RoleFactory.js';
import UserMetaFactory from './UserMetaFactory.js';

class UserFactory extends Factory {
  async make() {
    const randomRole = await RoleFactory.make();

    const userMeta = await UserMetaFactory.make();

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    const record = await this.insert(user, userMeta, randomRole);
    this.inserted.push(record);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(user, userMeta, randomRole) {
    const repository = getConnection().getRepository('User');
    let record = await repository.findOne({
      where: { email: user.email },
    });
    if (record) return record;

    const userMetaRepository = getConnection().getRepository('UserMeta');
    await userMetaRepository.save({
      ...userMeta,
    });

    const roleRepository = getConnection().getRepository('Role');
    await roleRepository.save({
      ...randomRole,
    });

    record = await repository.save({
      email: user.email,
      password: user.password,
      user_meta: userMeta.id,
      role: randomRole.id,
    });

    return record;
  }
}

export default new UserFactory();
