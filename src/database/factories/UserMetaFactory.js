import { getConnection } from 'typeorm';
import faker from '@faker-js/faker';
import Factory from './Factory.js';

class UserMetaFactory extends Factory {
  // eslint-disable-next-line class-methods-use-this
  async make() {
    const userMeta = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      avatar: faker.internet.avatar(),
    };

    const record = await this.insert(userMeta);

    this.inserted.push(record);

    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(object) {
    const repository = getConnection().getRepository('UserMeta');

    let record = await repository.findOne({
      where: { userName: object.userName },
    });
    if (record) return record;

    record = await repository.save(object);

    return record;
  }
}

export default new UserMetaFactory();
