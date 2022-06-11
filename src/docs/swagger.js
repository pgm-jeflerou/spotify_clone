/**
 * The swagger configuration
 */

import schemas from './schemas.js';
import paths from './paths/index.js';

export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'An API that controls our spotify app',
    description: 'An awesome API that controls our spotify app',
    license: {
      name: 'Arteveldehogeschool',
      url: 'https://arteveldehogeschool.be',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Users',
      description:
        'All the create, read, update and delete endpoints for our users',
    },
    {
      name: 'Artists',
      description:
        'All the create, read, update and delete endpoints for our artists',
    },
    {
      name: 'Songs',
      description:
        'All the create, read, update and delete endpoints for our songs',
    },
    {
      name: 'Albums',
      description:
        'All the create, read, update and delete endpoints for our albums',
    },
    {
      name: 'Playlists',
      description:
        'All the create, read, update and delete endpoints for our playlists',
    },
  ],
  paths,
  components: {
    schemas,
  },
};
