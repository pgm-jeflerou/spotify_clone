import { getConnection } from 'typeorm';
import faker from '@faker-js/faker';
import Factory from './Factory.js';
import SongFactory from './SongFactory.js';

class PlaylistFactory extends Factory {
  async make() {
    const song = await SongFactory.make();

    const playlist = {
      name: faker.random.words(2),
    };

    const record = await this.insert(playlist, song);
    this.inserted.push(record);

    return record;
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(playlist, song) {
    const repository = getConnection().getRepository('Playlist');
    let record = await repository.findOne({
      where: { name: playlist.name },
    });
    if (record) return record;

    const songRepository = getConnection().getRepository('Album');
    await songRepository.save({
      ...song,
    });

    // save the name first relation later
    record = await repository.save({
      name: playlist.name,
    });

    const updatedSong = {
      ...song,
      playlists: record,
    };

    await songRepository.save(updatedSong);

    return record;
  }
}

export default new PlaylistFactory();
