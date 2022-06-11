/**
 * The song response
 */

export default {
  200: {
    description: 'Fetching songs was a success!',
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
