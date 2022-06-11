/**
 * The album paths
 */

import albumResponse from '../responses/index.js';

export default {
  '/albums': {
    get: {
      summary: 'Gets all the albums',
      description: 'Gets all the albums in database ...',
      tags: ['Albums'],
      responses: albumResponse,
    },
  },
  '/album/:id': {
    get: {
      summary: 'Gets a single album',
      description: 'Gets a single album based on the provided id ...',
      tags: ['Albums'],
      responses: albumResponse,
    },
    delete: {
      summary: 'Deletes a single album',
      description: 'Deletes a single album based on the provided id ...',
      tags: ['Albums'],
      responses: albumResponse,
    },
  },
  '/album': {
    post: {
      summary: 'Posts a single album',
      description: 'Posts a single album based on the provided body',
      tags: ['Albums'],
      responses: albumResponse,
    },
    put: {
      summary: 'Updates a single album',
      description: 'Updates a single album based on the provided body',
      tags: ['Albums'],
      responses: albumResponse,
    },
  },
};
