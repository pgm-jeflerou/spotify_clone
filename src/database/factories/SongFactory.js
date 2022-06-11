import { getConnection } from 'typeorm';
import faker from '@faker-js/faker';
import Factory from './Factory.js';
import AlbumFactory from './AlbumFactory.js';

class SongFactory extends Factory {
  async make() {
    const album = await AlbumFactory.make();

    const repository = getConnection().getRepository('Artist');
    const artist = await repository.findOne({
      where: { id: album.artist },
    });

    const song = {
      name: faker.random.words(5),
    };

    const record = await this.insert(album, artist, song);
    this.inserted.push(record);

    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(album, artist, song) {
    const repository = getConnection().getRepository('Song');
    let record = await repository.findOne({
      where: { name: song.name },
    });
    if (record) return record;

    const albumRepository = getConnection().getRepository('Album');
    await albumRepository.save({
      ...album,
    });

    record = await repository.save({
      name: song.name,
      artist: artist.id,
      album: album.id,
    });

    return record;
  }
}

export default new SongFactory();
