/**
 * The user response
 */

export default {
  200: {
    description: 'Fetching users was a success!',
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
