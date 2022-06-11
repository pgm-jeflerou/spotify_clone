/**
 * The artist paths
 */

import artistResponse from '../responses/index.js';

export default {
  '/artists': {
    get: {
      summary: 'Gets all the artists',
      description: 'Gets all the artists in database ...',
      tags: ['Artists'],
      responses: artistResponse,
    },
  },
  '/artist/:id': {
    get: {
      summary: 'Gets a single artist',
      description: 'Gets a single artist based on the provided id ...',
      tags: ['Artists'],
      responses: artistResponse,
    },
    delete: {
      summary: 'Deletes a single artist',
      description: 'Deletes a single artist based on the provided id ...',
      tags: ['Artists'],
      responses: artistResponse,
    },
  },
  '/artist': {
    post: {
      summary: 'Posts a single artist',
      description: 'Posts a single artist based on the provided body',
      tags: ['Artists'],
      responses: artistResponse,
    },
    put: {
      summary: 'Updates a single artist',
      description: 'Updates a single artist based on the provided body',
      tags: ['Artists'],
      responses: artistResponse,
    },
  },
};
