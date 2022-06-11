import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const home = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.redirect('/login');
    }
    const user = jwt.verify(token, process.env.TOKEN_SALT);

    const playlistRepository = getConnection().getRepository('Playlist');
    const artistRepository = getConnection().getRepository('Artist');
    const songRepository = getConnection().getRepository('Song');
    const albumRepository = getConnection().getRepository('Album');

    const { relations } = songRepository.metadata;
    const relationsArray = relations.map((relation) => relation.propertyName);

    const playlists = await playlistRepository.find();
    const playlistId = req.params?.id ? req.params?.id : '';
    const playlist = await playlistRepository.findOne({
      relations: ['songs'],
      where: {
        id: playlistId,
      },
    });
    const artists = await artistRepository.find();
    let otherSongs = await songRepository.find({
      relations: relationsArray,
    });
    const songs = await Promise.all(
      playlist.songs.map(
        async (song) =>
          // eslint-disable-next-line no-return-await
          await songRepository.findOne({
            relations: relationsArray,
            where: {
              id: song.id,
            },
          })
      )
    );
    otherSongs = otherSongs.filter(
      (otherSong) => !songs.find((song) => song.id === otherSong.id)
    );
    const albums = await albumRepository.find();

    res.render('home', {
      playlist,
      playlists,
      artists,
      songs,
      otherSongs,
      albums,
      user,
    });
  } catch (e) {
    next(e.message);
  }
};
