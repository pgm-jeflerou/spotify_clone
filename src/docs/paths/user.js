/**
 * The user paths
 */

import userResponse from '../responses/index.js';

export default {
  '/users': {
    get: {
      summary: 'Gets all the users',
      description: 'Gets all the users in database ...',
      tags: ['Users'],
      responses: userResponse,
    },
  },
  '/user/:id': {
    get: {
      summary: 'Gets a single user',
      description: 'Gets a single user based on the provided id ...',
      tags: ['Users'],
      responses: userResponse,
    },
    delete: {
      summary: 'Deletes a single user',
      description: 'Deletes a single user based on the provided id ...',
      tags: ['Users'],
      responses: userResponse,
    },
  },
  '/user': {
    post: {
      summary: 'Posts a single user',
      description: 'Posts a single user based on the provided body',
      tags: ['Users'],
      responses: userResponse,
    },
    put: {
      summary: 'Updates a single user',
      description: 'Updates a single user based on the provided body',
      tags: ['Users'],
      responses: userResponse,
    },
  },
};
