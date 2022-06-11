import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { create } from 'express-handlebars';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';
import { SOURCE_PATH } from './const.js';
import { home } from './controllers/home.js';
import { homeArtists } from './controllers/artist.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import entities from './models/index.js';
import swaggerDefinition from './docs/swagger.js';
import {
  getObject,
  deleteObject,
  updateObject,
  addObject,
} from './controllers/api/object.js';
import {
  register,
  postRegister,
  login,
  postLogin,
  logout,
} from './controllers/authentication.js';
import validationAuthentication from './middleware/validation/authentication.js';
import roleValidation from './middleware/validation/checkRoles.js';
import validateAdmin from './middleware/validation/adminAuthorization.js';
import validateEditor from './middleware/validation/editorAuthorization.js';
import { jwtAuth } from './middleware/jwtAuth.js';
import {
  addSongPlaylist,
  removeSongPlaylist,
} from './controllers/api/playlist.js';

const app = express();
app.use(express.static('public'));

/**
 * Import swagger documentation
 */

app.use(
  '/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDefinition)
);

/**
 * Import the body parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Import the cookie parser
 */

app.use(cookieParser());

/**
 * Handlebars init
 */

const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

/**
 * App routing
 */

app.get('/playlist/:id', jwtAuth, home);
app.get('/artist/:id', jwtAuth, homeArtists);

app.get('/register', register);
app.get('/login', login);
app.post(
  '/register',
  ...validationAuthentication,
  roleValidation,
  postRegister,
  register
);
app.post('/login', postLogin);
app.post('/logout', logout);

/**
 * API routing
 */

app.get('/api/users', validateAdmin, (req, res, next) =>
  getObject('User', req, res, next)
);
app.get('/api/user/:id', validateAdmin, (req, res, next) =>
  getObject('User', req, res, next)
);
app.delete('/api/user/:id', validateAdmin, (req, res, next) =>
  deleteObject('User', req, res, next)
);

app.post('/api/artist', validateAdmin, (req, res, next) =>
  addObject('Artist', req, res, next)
);
app.put('/api/artist', validateEditor, (req, res, next) =>
  updateObject('Artist', req, res, next)
);
app.delete('/api/artist/:id', validateAdmin, (req, res, next) =>
  deleteObject('Artist', req, res, next)
);

app.post('/api/song', validateAdmin, (req, res, next) =>
  addObject('Song', req, res, next)
);
app.put('/api/song', validateEditor, (req, res, next) =>
  updateObject('Song', req, res, next)
);
app.delete('/api/song/:id', validateAdmin, (req, res, next) =>
  deleteObject('Song', req, res, next)
);
app.get('/api/songs', (req, res, next) => getObject('Song', req, res, next));
app.get('/api/song/:id', (req, res, next) => getObject('Song', req, res, next));

app.post('/api/album', validateAdmin, (req, res, next) =>
  addObject('Album', req, res, next)
);
app.put('/api/album', validateEditor, (req, res, next) =>
  updateObject('Album', req, res, next)
);
app.delete('/api/album/:id', validateAdmin, (req, res, next) =>
  deleteObject('Album', req, res, next)
);
app.get('/api/albums', (req, res, next) => getObject('Album', req, res, next));
app.get('/api/album/:id', (req, res, next) =>
  getObject('Album', req, res, next)
);

app.post('/api/playlist', validateAdmin, (req, res, next) =>
  addObject('Playlist', req, res, next)
);
app.put('/api/playlist', validateEditor, (req, res, next) =>
  updateObject('Playlist', req, res, next)
);
app.delete('/api/playlist/:id', validateAdmin, (req, res, next) =>
  deleteObject('Playlist', req, res, next)
);
app.get('/api/playlists', (req, res, next) =>
  getObject('Playlist', req, res, next)
);
app.get('/api/playlist/:id', (req, res, next) =>
  getObject('Playlist', req, res, next)
);
app.get('/api/playlist/:userId', (req, res, next) =>
  getObject('Playlist', req, res, next)
);
app.put('/api/playlist/addSong', validateEditor, (req, res, next) =>
  addSongPlaylist(req, res, next)
);
app.put('/api/playlist/removeSong', validateEditor, (req, res, next) =>
  removeSongPlaylist(req, res, next)
);

/**
 * Creates a connection to our database en starts listening
 */

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  // logging: true,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {});
});
