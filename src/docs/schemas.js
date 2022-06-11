/* eslint-disable prettier/prettier */
/**
 * Our API schemas
 */

export default {
  'User': {
    properties: {
      id: {
        type: 'integer',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role'
      }
    },
  },
  'UserInput': {
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
    example: {
      email: 'adalovelace@gmail.com',
      password: 'test123',
      user_meta: {
        firstName: 'Ada',
        lastName: 'Lovelace',
        userName: 'Love',
        avatar: 'link',
      },
      role: {
        label: 'admin',
      },
    }
  },
  'UserMeta': {
    properties: {
      id: {
        type: 'integer',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      userName: {
        type: 'string',
      },
      avatar: {
        type: 'string',
      }
    }
  },
  'Role': {
    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
    }
  },
  'Artist': {
    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      albums: {
        $ref: '#/components/schemas/Album'
      }
    },
  },
  'Album': {
    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      artists: {
        $ref: '#/components/schemas/Artist',
      },
    }
  },
  'Song': {
    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      artists: {
        $ref: '#/components/schemas/Artist'
      }
    }
  },
  'Playlist': {
    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
    }
  }
};
