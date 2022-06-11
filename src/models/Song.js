/**
 * Our song
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Song',
  tableName: 'songs',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    artist: {
      target: 'Artist',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
      inverseSide: 'songs',
    },
    playlists: {
      target: 'Playlist',
      type: 'many-to-many',
      joinTable: { name: 'playlist_song' },
      cascade: true,
    },
    album: {
      target: 'Album',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
      inverseSide: 'songs',
      onDelete: 'CASCADE',
    },
  },
});
