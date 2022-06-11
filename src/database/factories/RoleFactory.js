import { getConnection } from 'typeorm';
import Factory from './Factory.js';

class RoleFactory extends Factory {
  constructor() {
    super();
    this.roles = ['admin', 'editor', 'reader'];
  }

  async make() {
    const record = await this.insert(
      this.roles[Math.floor(Math.random() * this.roles.length)]
    );
    this.inserted.push(record);

    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(name) {
    const repository = getConnection().getRepository('Role');

    const record = await repository.save({ name });

    return record;
  }
}

export default new RoleFactory();
