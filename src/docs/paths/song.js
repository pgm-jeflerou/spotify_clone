/**
 * The song paths
 */

import songResponse from '../responses/index.js';

export default {
  '/songs': {
    get: {
      summary: 'Gets all the songs',
      description: 'Gets all the songs in database ...',
      tags: ['Songs'],
      responses: songResponse,
    },
  },
  '/song/:id': {
    get: {
      summary: 'Gets a single song',
      description: 'Gets a single song based on the provided id ...',
      tags: ['Songs'],
      responses: songResponse,
    },
    delete: {
      summary: 'Deletes a single song',
      description: 'Deletes a single song based on the provided id ...',
      tags: ['Songs'],
      responses: songResponse,
    },
  },
  '/song': {
    post: {
      summary: 'Posts a single song',
      description: 'Posts a single song based on the provided body',
      tags: ['Songs'],
      responses: songResponse,
    },
    put: {
      summary: 'Updates a single song',
      description: 'Updates a single song based on the provided body',
      tags: ['Songs'],
      responses: songResponse,
    },
  },
};
