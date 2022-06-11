/**
 * Our album
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Album',
  tableName: 'albums',
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
      inverseSide: 'artists',
      onDelete: 'CASCADE',
    },
    songs: {
      target: 'Song',
      type: 'one-to-many',
      joinColumn: true,
      inverseSide: 'album',
    },
  },
});
