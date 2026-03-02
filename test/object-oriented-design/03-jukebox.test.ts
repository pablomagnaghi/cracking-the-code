import { Song, Playlist, Jukebox } from '../../src/object-oriented-design/03-jukebox';

describe('Jukebox', () => {
  test('Song stores metadata', () => {
    const song = new Song('Bohemian Rhapsody', 'Queen', 354);
    expect(song.title).toBe('Bohemian Rhapsody');
    expect(song.artist).toBe('Queen');
    expect(song.durationSeconds).toBe(354);
  });

  test('Playlist adds and retrieves songs in order', () => {
    const playlist = new Playlist();
    const s1 = new Song('A', 'Artist1', 100);
    const s2 = new Song('B', 'Artist2', 200);
    playlist.addSong(s1);
    playlist.addSong(s2);
    expect(playlist.size()).toBe(2);
    expect(playlist.peekNextSong()).toBe(s1);
    expect(playlist.getNextSong()).toBe(s1);
    expect(playlist.size()).toBe(1);
    expect(playlist.getNextSong()).toBe(s2);
    expect(playlist.size()).toBe(0);
  });

  test('Playlist removes song by title', () => {
    const playlist = new Playlist();
    playlist.addSong(new Song('A', 'X', 100));
    playlist.addSong(new Song('B', 'Y', 200));
    expect(playlist.removeSong('A')).toBe(true);
    expect(playlist.size()).toBe(1);
    expect(playlist.removeSong('Z')).toBe(false);
  });

  test('Jukebox manages catalog and playlist', () => {
    const jukebox = new Jukebox();
    jukebox.addSong(new Song('Song1', 'Artist1', 180));
    jukebox.addSong(new Song('Song2', 'Artist2', 240));
    expect(jukebox.getCatalogSize()).toBe(2);

    expect(jukebox.addToPlaylist('Song1')).toBe(true);
    expect(jukebox.addToPlaylist('Song2')).toBe(true);
    expect(jukebox.addToPlaylist('NonExistent')).toBe(false);
    expect(jukebox.getPlaylistSize()).toBe(2);
  });

  test('Jukebox plays next song from playlist', () => {
    const jukebox = new Jukebox();
    const song = new Song('Track1', 'Band', 300);
    jukebox.addSong(song);
    jukebox.addToPlaylist('Track1');

    const playing = jukebox.playNext();
    expect(playing).toBe(song);
    expect(jukebox.isPlaying()).toBe(true);
    expect(jukebox.getCurrentSong()).toBe(song);
    expect(jukebox.getPlaylistSize()).toBe(0);
  });

  test('Jukebox playNext returns undefined when playlist is empty', () => {
    const jukebox = new Jukebox();
    expect(jukebox.playNext()).toBeUndefined();
    expect(jukebox.isPlaying()).toBe(false);
  });

  test('Jukebox plays specific song by title', () => {
    const jukebox = new Jukebox();
    const song = new Song('Direct', 'Artist', 120);
    jukebox.addSong(song);

    expect(jukebox.playSong('Direct')).toBe(song);
    expect(jukebox.isPlaying()).toBe(true);
    expect(jukebox.playSong('Unknown')).toBeUndefined();
  });

  test('Jukebox pause and stop', () => {
    const jukebox = new Jukebox();
    jukebox.addSong(new Song('S', 'A', 100));
    jukebox.playSong('S');

    jukebox.pause();
    expect(jukebox.isPlaying()).toBe(false);
    expect(jukebox.getCurrentSong()?.title).toBe('S');

    jukebox.stop();
    expect(jukebox.isPlaying()).toBe(false);
    expect(jukebox.getCurrentSong()).toBeUndefined();
  });

  test('Jukebox removeFromPlaylist', () => {
    const jukebox = new Jukebox();
    jukebox.addSong(new Song('A', 'X', 100));
    jukebox.addSong(new Song('B', 'Y', 200));
    jukebox.addToPlaylist('A');
    jukebox.addToPlaylist('B');

    expect(jukebox.removeFromPlaylist('A')).toBe(true);
    expect(jukebox.getPlaylistSize()).toBe(1);
  });
});
