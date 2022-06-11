/**
 * The playlist response
 */

export default {
  200: {
    description: 'Fetching playlists was a success!',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
  },
};
