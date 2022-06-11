/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

const app = {
  init() {
    this.cacheElements();
    this.registerListeners();
    this.songId = 0;
    this.songTime = 0;
    this.volume = 1;
    this.currentSong = 0;
    this.songs = [
      './sounds/rickRoll.mp3',
      './sounds/nyan.mp3',
      './sounds/allStar.mp3',
      './sounds/heMan.mp3',
      './sounds/sax.mp3',
      './sounds/friday.mp3',
      './sounds/coffin.mp3',
    ];
    this.changeCurrentPlaylist();
    this.changeTheme();
    this.removeEmptyLi();
  },
  cacheElements() {
    this.$artistEdit = document.querySelectorAll('.artist-edit');
    this.$artistDelete = document.querySelectorAll('.artist-delete');
    this.$playlistEdit = document.querySelectorAll('.playlist-edit');
    this.$playlistDelete = document.querySelectorAll('.playlist-delete');
    this.$play = document.querySelectorAll('.play');
    this.$pause = document.querySelectorAll('.pause');
    this.$soundSlider = document.querySelector('.soundSlider');
    this.$next = document.querySelector('.next-song');
    this.$previous = document.querySelector('.previous-song');
    this.$addArtist = document.querySelector('.add-artist');
    this.$addPlaylist = document.querySelector('.add-playlist');
    this.$shuffle = document.querySelector('.shuffle');
    this.$restart = document.querySelector('.restart-song');
    this.$theme = document.querySelector('.theme-switcher');
    this.$playlists = document.querySelectorAll('.playlist');
    this.$addSongPlaylist = document.querySelector('.add-song-playlist');
    this.$removeSongPlaylist = document.querySelectorAll(
      '.playlist-remove-song'
    );
    this.$modal = document.querySelector('.modal');
    this.$modal_title = document.querySelector('.modal-title');
    this.$songDelete = document.querySelectorAll('.delete-song');
    this.$songEdit = document.querySelectorAll('.edit-song');
    this.$albumDelete = document.querySelectorAll('.delete-album');
    this.$albumEdit = document.querySelectorAll('.edit-album');
    this.$addAlbum = document.querySelector('.add-album');
    this.$addSong = document.querySelectorAll('.add-song');
  },
  playSound(soundPath) {
    this.sound = new Audio(`../${soundPath}`);
    this.sound.play();
    this.sound.onended = () => {
      this.$next.click();
    };
  },
  getDuration() {
    this.duration = this.sound.duration;
  },
  registerListeners() {
    if (this.$addAlbum) {
      this.$addAlbum.addEventListener(
        'click',
        async (e) => {
          const url = new URL(window.location.href);
          // got this from stackoverflow: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
          const artistId = /[^/]*$/.exec(url.href)[0];
          e.preventDefault();
          const name = document.getElementById('add-album').value;
          await fetch(`http://localhost:3000/api/album`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ name: `${name}`, artist: artistId }),
          });
          document.location.reload();
        },
        false
      );
    }

    if (this.$addSong) {
      this.$addSong.forEach((button) => {
        button.addEventListener(
          'click',
          async (e) => {
            let albumId =
              e.target.parentNode.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
            const url = new URL(window.location.href);
            // got this from stackoverflow: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
            const artistId = /[^/]*$/.exec(url.href)[0];
            e.preventDefault();
            const name = document.getElementById(albumId).value;
            albumId = parseInt(albumId, 10);
            await fetch(`http://localhost:3000/api/song`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                name: `${name}`,
                artist: artistId,
                album: albumId,
              }),
            });
            document.location.reload();
          },
          false
        );
      });
    }

    if (this.$songDelete) {
      this.$songDelete.forEach((button) => {
        button.addEventListener(
          'click',
          async (e) => {
            const id =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/song/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json',
              },
            });
            document.location.reload();
          },
          false
        );
      });
    }

    if (this.$albumDelete) {
      this.$albumDelete.forEach((button) => {
        button.addEventListener(
          'click',
          async (e) => {
            const id =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/album/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json',
              },
            });
            document.location.reload();
          },
          false
        );
      });
    }

    if (this.$albumEdit) {
      this.$albumEdit.forEach((button) => {
        button.addEventListener(
          'click',
          (e) => {
            const url = new URL(window.location.href);
            // got this from stackoverflow: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
            const artistId = /[^/]*$/.exec(url.href)[0];
            const albumId =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            this.$modal_title.innerHTML = 'Change the albums name';
            this.$modal.classList.toggle('hidden');
            document.querySelector('.new-name-button').addEventListener(
              'click',
              async () => {
                await fetch(`http://localhost:3000/api/album`, {
                  method: 'PUT',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: albumId,
                    name: document.querySelector('.new-name').value,
                    artist: artistId,
                  }),
                });
                document.location.reload();
              },
              false
            );
          },
          false
        );
      });
    }

    if (this.$songEdit) {
      this.$songEdit.forEach((button) => {
        button.addEventListener(
          'click',
          (e) => {
            const songId =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            this.$modal_title.innerHTML = 'Change the songs name';
            this.$modal.classList.toggle('hidden');
            document.querySelector('.new-name-button').addEventListener(
              'click',
              async () => {
                await fetch(`http://localhost:3000/api/song`, {
                  method: 'PUT',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: songId,
                    name: document.querySelector('.new-name').value,
                  }),
                });
                document.location.reload();
              },
              false
            );
          },
          false
        );
      });
    }

    if (this.$artistEdit) {
      this.$artistEdit.forEach((button) => {
        button.addEventListener(
          'click',
          (e) => {
            const artistId =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            this.$modal_title.innerHTML = 'Change the artists name';
            this.$modal.classList.toggle('hidden');
            document.querySelector('.new-name-button').addEventListener(
              'click',
              async () => {
                await fetch(`http://localhost:3000/api/artist`, {
                  method: 'PUT',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: artistId,
                    name: document.querySelector('.new-name').value,
                  }),
                });
                document.location.reload();
              },
              false
            );
          },
          false
        );
      });
    }

    if (this.$playlistEdit) {
      this.$playlistEdit.forEach((button) => {
        button.addEventListener(
          'click',
          (e) => {
            const playlistId =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            this.$modal_title.innerHTML = 'Change the playlist name';
            this.$modal.classList.toggle('hidden');
            document.querySelector('.new-name-button').addEventListener(
              'click',
              async () => {
                await fetch(`http://localhost:3000/api/playlist`, {
                  method: 'PUT',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: playlistId,
                    name: document.querySelector('.new-name').value,
                  }),
                });
                document.location.reload();
              },
              false
            );
          },
          false
        );
      });
    }

    if (this.$artistDelete) {
      this.$artistDelete.forEach((button) => {
        button.addEventListener(
          'click',
          async (e) => {
            const id =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/artist/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json',
              },
            });
            document.location.reload();
          },
          false
        );
      });
    }

    if (this.$playlistDelete) {
      this.$playlistDelete.forEach((button) => {
        button.addEventListener(
          'click',
          async (e) => {
            const id =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/playlist/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json',
              },
            });
            document.location.reload();
          },
          false
        );
      });
    }

    this.$play.forEach((button) => {
      button.addEventListener(
        'click',
        async (e) => {
          if (button.innerHTML !== `<i class="fa-solid fa-pause"></i>`) {
            this.sound ? (this.sound.volume = 0) : '';
            const id =
              e.target.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.dataset.id;
            if (this.songId !== id) {
              this.songId = id;
              this.playSound('./sounds/rickRoll.mp3');
            } else {
              this.sound.currentTime = this.songTime;
              this.sound.play();
              this.sound.volume = this.volume;
              this.sound.onended = () => {
                this.$next.click();
              };
            }
            button.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            document.querySelector(
              '.controller-play'
            ).innerHTML = `<i class="fa-solid fa-pause"></i>`;
          } else {
            this.songTime = this.sound.currentTime;
            this.sound.volume = 0;
            this.sound.onended = () => {};
            button.innerHTML = `<i class="fa-solid fa-play"></i>`;
            document.querySelectorAll('.play').forEach((pause) => {
              pause.innerHTML = `<i class="fa-solid fa-play"></i>`;
            });
          }
          this.getDuration();
        },
        false
      );
    });

    this.$soundSlider.addEventListener('input', () => {
      this.volume = this.$soundSlider.value;
      this.sound.volume = this.volume;
    });

    this.$next.addEventListener(
      'click',
      () => {
        if (this.sound) {
          this.sound.volume = 0;
          this.sound.onended = () => {};
        }
        if (!this.shuffle) {
          this.currentSong < this.songs.length - 1
            ? (this.currentSong += 1)
            : (this.currentSong = 0);
          this.playSound(this.songs[this.currentSong]);
          this.sound.volume = this.volume;
        } else {
          this.playSound(
            this.songs[Math.floor(Math.random() * (this.songs.length - 1))]
          );
          this.sound.volume = this.volume;
        }
        document.querySelector(
          '.controller-play'
        ).innerHTML = `<i class="fa-solid fa-pause"></i>`;
        this.getDuration();
      },
      false
    );

    this.$previous.addEventListener(
      'click',
      () => {
        if (this.sound) {
          this.sound.volume = 0;
          this.sound.onended = () => {};
        }
        if (!this.shuffle) {
          this.currentSong > 0
            ? (this.currentSong -= 1)
            : (this.currentSong = this.songs.length - 1);
          this.playSound(this.songs[this.currentSong]);
          this.sound.volume = this.volume;
        } else {
          this.playSound(
            this.songs[Math.floor(Math.random() * this.songs.length)]
          );
          this.sound.volume = this.volume;
        }
        document.querySelector(
          '.controller-play'
        ).innerHTML = `<i class="fa-solid fa-pause"></i>`;
        this.getDuration();
      },
      false
    );

    this.$restart.addEventListener(
      'click',
      () => {
        if (this.sound) {
          this.sound.currentTime = 0;
        }
      },
      false
    );

    this.$shuffle.addEventListener(
      'click',
      () => {
        this.shuffle === true ? (this.shuffle = false) : (this.shuffle = true);
        this.$shuffle.classList.toggle('active');
      },
      false
    );

    if (this.$addArtist) {
      this.$addArtist.addEventListener(
        'click',
        async (e) => {
          e.preventDefault();
          const name = document.getElementById('add-artist').value;
          await fetch(`http://localhost:3000/api/artist`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ name: `${name}` }),
          });
          document.location.reload();
        },
        false
      );
    }

    if (this.$addPlaylist) {
      this.$addPlaylist.addEventListener(
        'click',
        async () => {
          const name = document.getElementById('add-playlist').value;
          await fetch(`http://localhost:3000/api/playlist`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ name: `${name}` }),
          });
          document.location.reload();
        },
        false
      );
    }

    this.$theme.addEventListener(
      'click',
      () => {
        const $body = document.querySelector('body');
        $body.classList.toggle('theme-dark');
        $body.classList.toggle('theme-light');
        if ($body.classList.contains('theme-dark')) {
          localStorage.setItem('theme', 'theme-dark');
        } else {
          localStorage.setItem('theme', 'theme-light');
        }
      },
      false
    );

    if (this.$addSongPlaylist) {
      this.$addSongPlaylist.addEventListener(
        'click',
        async () => {
          const url = new URL(window.location.href);
          // got this from stackoverflow: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
          const pId = /[^/]*$/.exec(url.href)[0];
          const sId = document.querySelector('.new-song').value;
          await fetch(`http://localhost:3000/api/playlist/addSong`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ playlistId: pId, songsId: sId }),
          });
          document.location.reload();
        },
        false
      );
    }

    if (this.$removeSongPlaylist) {
      this.$removeSongPlaylist.forEach((button) => {
        button.addEventListener(
          'click',
          async (e) => {
            const id =
              e.target.parentNode.parentNode.parentNode.dataset.id ||
              e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
            const url = new URL(window.location.href);
            // got this from stackoverflow: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
            const pId = /[^/]*$/.exec(url.href)[0];
            await fetch(`http://localhost:3000/api/playlist/removeSong`, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({ playlistId: pId, songsId: id }),
            });
            document.location.reload();
          },
          false
        );
      });
    }
  },

  changeCurrentPlaylist() {
    const url = new URL(window.location.href);
    // got this from stackoverflow: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
    const playlistId = /[^/]*$/.exec(url.href)[0];
    this.$playlists.forEach((playlist) => {
      if (playlist.dataset.id === playlistId) {
        playlist.classList.toggle('current-playlist');
      }
    });
  },

  changeTheme() {
    const $body = document.querySelector('body');
    if (!$body.classList.contains(localStorage.getItem('theme'))) {
      $body.classList.remove(...$body.classList);
      $body.classList.add(localStorage.getItem('theme'));
    }
  },

  removeEmptyLi() {
    const $spans = document.querySelectorAll('.song-title-albums');
    $spans.forEach((span) => {
      if (span.innerHTML === '') {
        span.parentElement.innerHTML = '';
      }
    });
  },
};

app.init();
