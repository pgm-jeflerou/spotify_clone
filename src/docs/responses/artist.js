/**
 * The artist response
 */

export default {
  200: {
    description: 'Fetching artists was a success!',
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
