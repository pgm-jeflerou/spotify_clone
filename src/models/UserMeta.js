/**
 * Our user meta data
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'UserMeta',
  tableName: 'user_meta',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstName: {
      type: 'varchar',
    },
    lastName: {
      type: 'varchar',
    },
    userName: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
    },
  },
});
