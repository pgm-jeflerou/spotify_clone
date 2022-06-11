/**
 * The playlist paths
 */

import playlistResponse from '../responses/index.js';

export default {
  '/playlists': {
    get: {
      summary: 'Gets all the playlists',
      description: 'Gets all the playlists in database ...',
      tags: ['Playlists'],
      responses: playlistResponse,
    },
  },
  '/playlist/:id': {
    get: {
      summary: 'Gets a single playlist',
      description: 'Gets a single playlist based on the provided id ...',
      tags: ['Playlists'],
      responses: playlistResponse,
    },
    delete: {
      summary: 'Deletes a single playlist',
      description: 'Deletes a single playlist based on the provided id ...',
      tags: ['Playlists'],
      responses: playlistResponse,
    },
  },
  '/playlist': {
    post: {
      summary: 'Posts a single playlist',
      description: 'Posts a single playlist based on the provided body',
      tags: ['Playlists'],
      responses: playlistResponse,
    },
    put: {
      summary: 'Updates a single playlist',
      description: 'Updates a single playlist based on the provided body',
      tags: ['Playlists'],
      responses: playlistResponse,
    },
  },
};
