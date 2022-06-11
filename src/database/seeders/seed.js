/* eslint-disable import/named */
import DatabaseSeeder from './DatabaseSeeder.js';
import { UserFactory, PlaylistFactory } from '../factories/index.js';
import entities from '../../models/index.js';

// new instance of db seeder
const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_NAME,
  entities
);

// seed with the user factory
dbSeeder.run(UserFactory, 50).then((records) => {
  console.log(`${records.length} seeded in db`);
  console.log(records);
});

// not fully functional should seed my songs
dbSeeder.run(PlaylistFactory, 50).then((records) => {
  console.log(`${records.length} seeded in db`);
  console.log(records);
});
