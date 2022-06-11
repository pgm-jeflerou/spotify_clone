import { getConnection } from 'typeorm';

export const addSongPlaylist = async (req, res, next) => {
  try {
    // get the repository
    const playlistRepository = getConnection().getRepository('Playlist');
    const songRepository = getConnection().getRepository('Song');

    const playlist = await playlistRepository.findOne({
      where: { id: req.body.playlistId },
    });

    const playlists = await playlistRepository.find({
      relations: ['songs'],
    });

    const song = await songRepository.findOne({
      where: { id: req.body.songsId },
    });

    // this finds all playlists that contain the song
    const songPlaylists = playlists.filter((p) =>
      p.songs.find((s) => s.id === song.id)
    );

    const updatedSong = {
      ...song,
      playlists: [playlist, ...songPlaylists],
    };

    songRepository.save(updatedSong);
  } catch (e) {
    next(e.message);
  }
};

export const removeSongPlaylist = async (req, res, next) => {
  try {
    // get the repository
    const playlistRepository = getConnection().getRepository('Playlist');
    const songRepository = getConnection().getRepository('Song');

    const playlists = await playlistRepository.find({
      relations: ['songs'],
    });

    const playlist = await playlistRepository.findOne({
      where: { id: req.body.playlistId },
    });

    const song = await songRepository.findOne({
      where: { id: req.body.songsId },
    });

    // this finds all playlists that contain the song
    const songPlaylists = playlists.filter((p) =>
      p.songs.find((s) => s.id === song.id)
    );

    const updatedPlaylists = songPlaylists.filter(
      (play) => play.id !== playlist.id
    );

    const updatedSong = {
      ...song,
      playlists: [...updatedPlaylists],
    };

    songRepository.save(updatedSong);
  } catch (e) {
    next(e.message);
  }
};
