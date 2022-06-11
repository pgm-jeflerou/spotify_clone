import { getConnection } from 'typeorm';
import faker from '@faker-js/faker';
import Factory from './Factory.js';

class ArtistFactory extends Factory {
  async make() {
    const artist = {
      name: faker.name.findName(),
    };

    const record = await this.insert(artist);
    this.inserted.push(record);

    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(name) {
    const repository = getConnection().getRepository('Artist');

    // eslint-disable-next-line object-shorthand
    const record = await repository.save(name);

    return record;
  }
}

export default new ArtistFactory();
