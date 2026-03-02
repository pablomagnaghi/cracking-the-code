// 07.03. Jukebox
//
// Design a musical jukebox using object-oriented principles.
//
// Approach:
//   - A Song class holds metadata (title, artist, duration).
//   - A Playlist holds an ordered list of songs and supports add, remove, and
//     next-song operations.
//   - A Jukebox manages a song catalog, the current playlist, and playback
//     state (playing / paused / stopped). It exposes addSong, playSong,
//     addToPlaylist, playNext, pause, and stop operations.
//
// Example:
//   const jukebox = new Jukebox();
//   jukebox.addSong(new Song('Bohemian Rhapsody', 'Queen', 354));
//   jukebox.addToPlaylist('Bohemian Rhapsody');
//   jukebox.playNext(); // starts playing
//
// Constraints:
//   - Songs are identified by title within the catalog.
//   - Playing a song removes it from the front of the playlist.
//   - The jukebox tracks a current song and playing/paused state.

export class Song {
  readonly title: string;
  readonly artist: string;
  readonly durationSeconds: number;

  constructor(title: string, artist: string, durationSeconds: number) {
    this.title = title;
    this.artist = artist;
    this.durationSeconds = durationSeconds;
  }
}

export class Playlist {
  private songs: Song[] = [];

  addSong(song: Song): void {
    this.songs.push(song);
  }

  removeSong(title: string): boolean {
    const index = this.songs.findIndex((s) => s.title === title);
    if (index === -1) return false;
    this.songs.splice(index, 1);
    return true;
  }

  getNextSong(): Song | undefined {
    return this.songs.shift();
  }

  peekNextSong(): Song | undefined {
    return this.songs[0];
  }

  size(): number {
    return this.songs.length;
  }

  getSongs(): Song[] {
    return [...this.songs];
  }
}

export class Jukebox {
  private catalog: Map<string, Song> = new Map();
  private playlist: Playlist = new Playlist();
  private currentSong?: Song;
  private playing: boolean = false;

  addSong(song: Song): void {
    this.catalog.set(song.title, song);
  }

  getSong(title: string): Song | undefined {
    return this.catalog.get(title);
  }

  getCatalogSize(): number {
    return this.catalog.size;
  }

  addToPlaylist(title: string): boolean {
    const song = this.catalog.get(title);
    if (!song) return false;
    this.playlist.addSong(song);
    return true;
  }

  removeFromPlaylist(title: string): boolean {
    return this.playlist.removeSong(title);
  }

  getPlaylistSize(): number {
    return this.playlist.size();
  }

  /** Play the next song in the playlist. */
  playNext(): Song | undefined {
    const song = this.playlist.getNextSong();
    if (!song) {
      this.currentSong = undefined;
      this.playing = false;
      return undefined;
    }
    this.currentSong = song;
    this.playing = true;
    return song;
  }

  /** Play a specific song immediately (does not affect playlist). */
  playSong(title: string): Song | undefined {
    const song = this.catalog.get(title);
    if (!song) return undefined;
    this.currentSong = song;
    this.playing = true;
    return song;
  }

  pause(): void {
    this.playing = false;
  }

  stop(): void {
    this.currentSong = undefined;
    this.playing = false;
  }

  getCurrentSong(): Song | undefined {
    return this.currentSong;
  }

  isPlaying(): boolean {
    return this.playing;
  }
}
