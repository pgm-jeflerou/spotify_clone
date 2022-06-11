import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const homeArtists = async (req, res, next) => {
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

    const { relations } = artistRepository.metadata;
    const relationsArray = relations.map((relation) => relation.propertyName);

    const playlists = await playlistRepository.find();
    const artists = await artistRepository.find();
    const artistId = req.params?.id ? parseInt(req.params?.id, 10) : '';
    const artist = await artistRepository.findOne({
      relations: [...relationsArray],
      where: {
        id: artistId,
      },
    });
    const albums = await albumRepository.find({
      relations: ['artist'],
    });
    const filteredAlbums = albums.filter(
      (album) => album.artist.id === artistId
    );
    const songs = await songRepository.find({
      relations: ['artist', 'album'],
    });

    const filteredSongs = songs.filter((song) => song.artist.id === artistId);

    res.render('artist', {
      artist,
      playlists,
      artists,
      filteredSongs,
      filteredAlbums,
      user,
    });
  } catch (e) {
    next(e.message);
  }
};
