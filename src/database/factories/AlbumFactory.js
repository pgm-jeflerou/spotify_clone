import { getConnection } from 'typeorm';
import faker from '@faker-js/faker';
import Factory from './Factory.js';
import ArtistFactory from './ArtistFactory.js';

class AlbumFactory extends Factory {
  async make() {
    const artist = await ArtistFactory.make();

    const album = {
      name: faker.random.words(3),
    };

    const record = await this.insert(album, artist);
    this.inserted.push(record);

    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(album, artist) {
    const repository = getConnection().getRepository('Album');
    let record = await repository.findOne({
      where: { name: album.name },
    });
    if (record) return record;

    const artistRepository = getConnection().getRepository('Artist');
    await artistRepository.save({
      ...artist,
    });

    record = await repository.save({
      name: album.name,
      artist: artist.id,
    });

    return record;
  }
}

export default new AlbumFactory();
