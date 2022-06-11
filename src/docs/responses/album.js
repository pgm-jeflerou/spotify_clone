/**
 * The album response
 */

export default {
  200: {
    description: 'Fetching albums was a success!',
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
