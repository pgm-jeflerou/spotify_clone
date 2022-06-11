/*
 * A module with some custom block helpers
 */

export default {
  button(type, className, options) {
    const validTypes = ['submit', 'button'];

    if (validTypes.includes(type)) {
      return `<button type="${type}" class="${className}" 
      }">${options.fn()}</button>`;
    }

    return `<button>${options.fn()}</button>`;
  },
  admin(role, options) {
    if (role === 'admin') {
      return `${options.fn()}`;
    }
  },
  editor(role, options) {
    if (role === 'admin' || role === 'editor') {
      return `${options.fn()}`;
    }
  },
  album(id, albums) {
    return albums.find((album) => album.id === id).name;
  },
  artist(id, artists) {
    return artists.find((artist) => artist.id === id).name;
  },
  song(id, song) {
    return song.album.id === id ? song.name : '';
  },
};
