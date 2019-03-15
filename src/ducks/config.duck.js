import {
  fetchGenres,
  fetchArtistByGenre,
  fetchTracksByArtist
} from '../services/api'
import { getRandomInt, chooseRandom } from '../utils/request'

// Acion Types
export const LOAD_GENRES_BEGIN = 'LOAD_GENRES_BEGIN'
export const LOAD_GENRES_FAILURE = 'LOAD_GENRES_FAILURE'
export const LOAD_GENRES_DONE = 'LOAD_GENRES_DONE'
export const LOAD_GENRES_UPDATE = 'LOAD_GENRES_UPDATE'
export const SELECT_GENRE = 'SELECT_GENRE'
export const SELECT_NUM_SONGS = 'SELECT_NUM_SONGS'
export const SELECT_NUM_ARTIST = 'SELECT_NUM_ARTIST'
export const CREATE_GAME = 'CREATE_GAME'
export const LOAD_ARTIST_DONE = 'LOAD_ARTIST_DONE'
export const LOAD_ARTISTS_FAILURE = 'LOAD_ARTISTS_FAILURE'
export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'
export const STOP_SONG = 'STOP_SONG'
export const TRACKS = 'TRACKS'
export const LOAD_TRACKS_FAILURE = 'LOAD_TRACKS_FAILURE'
export const LOAD_TRACKS_DONE = 'LOAD_TRACKS_DONE'
export const SELECTED_ANSWER = 'SELECTED_ANSWER'
export const LOAD_CORRECT_ANSWER = 'LOAD_CORRECT_ANSWER'

const initialState = {
  genres: [],
  genre: 'Acoustic',
  artists: [],
  numArtists: 2,
  numSongs: 1,
  errorLoadingGenres: false,
  playSong: false,
  pauseSong: false,
  stopSong: false,
  tracks: undefined,
  selectedAnswer: undefined,
  correctAnswer: undefined
}

// *****Main reducer function
export default function config (state = initialState, action) {
  switch (action.type) {
    case LOAD_CORRECT_ANSWER:
      return {
        ...state,
        correctAnswer: action.payload
      }
    case LOAD_ARTISTS_FAILURE:
      return {
        ...state,
        tracks: initialState.tracks
      }
    case LOAD_GENRES_DONE:
      return {
        ...state,
        errorLoadingGenres: false,
        genres: action.payload
      }
    case LOAD_GENRES_FAILURE:
      return {
        ...state,
        errorLoadingGenres: true,
        genres: initialState.genres
      }
    case SELECT_GENRE:
      return {
        ...state,
        genre: action.payload
      }
    case LOAD_ARTIST_DONE:
      return {
        ...state,
        artists: action.payload
      }
    case LOAD_ARTISTS_FAILURE:
      return {
        ...state,
        errorLoadingArtist: true,
        artists: initialState.artists
      }
    case SELECT_NUM_SONGS:
      return {
        ...state,
        numSongs: action.payload
      }
    case SELECT_NUM_ARTIST:
      return {
        ...state,
        numArtists: action.payload
      }
    case PLAY_SONG:
      return {
        ...state,
        playSong: true
      }
    case PAUSE_SONG:
      return {
        ...state,
        pauseSong: true
      }
    case STOP_SONG:
      return {
        ...state,
        stopSong: true
      }
    case TRACKS:
      return {
        ...state,
        tracks: action.payload
      }
    case SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload
      }
    default:
      return state
  }
}

// *****Landing Page (index.js) Action Creators
export const selectGenre = (genre = 'Acoustic') => ({
  type: SELECT_GENRE,
  payload: genre
})

export const loadCorrectAnswer = artist => ({
  type: LOAD_CORRECT_ANSWER,
  payload: artist
})

const loadGenresDone = genres => ({
  type: LOAD_GENRES_DONE,
  payload: genres
})

const loadGenresFailure = () => ({
  type: LOAD_GENRES_FAILURE
})
export const selectNumSongs = (number = '1') => ({
  type: SELECT_NUM_SONGS,
  payload: number
})

export const selectNumArtists = (number = '2') => ({
  type: SELECT_NUM_ARTIST,
  payload: number
})
// *****GamePage Action Creators
export const loadTracksDone = tracks => ({
  type: TRACKS,
  payload: tracks
})
const loadTracksFailure = () => ({
  type: LOAD_TRACKS_FAILURE
})
const playSongCreator = () => ({
  type: PLAY_SONG
})
const pauseSongCreator = () => ({
  type: PAUSE_SONG
})
const stopSongCreator = () => ({
  type: STOP_SONG
})
export const loadArtistDone = items => ({
  type: LOAD_ARTIST_DONE,
  payload: items
})
export const loadArtistsFailure = () => ({
  type: LOAD_ARTISTS_FAILURE
})
export const selectedAnswer = artist => ({
  type: SELECTED_ANSWER,
  payload: artist
})

// *****Action Creators-API(Async)
export const loadGenres = () => dispatch =>
  fetchGenres()
    .then(({ genres }) => {
      return dispatch(loadGenresDone(genres))
    })
    .catch(err => dispatch(loadGenresFailure(err)))

export const loadArtistByGenres = (genre, numArtists) => dispatch =>
  fetchArtistByGenre(genre)
    .then(({ artists }) => {
      const artistsRefined = chooseRandom(artists.items, numArtists).map(
        artist => ({ name: artist.name, id: artist.id, images: artist.images })
      )

      return dispatch(loadArtistDone(artistsRefined))
    })
    .catch(err => dispatch(loadArtistsFailure(err)))

export const loadTracksByArtists = (artist, numSongs) => dispatch =>
  fetchTracksByArtist(artist)
    .then(({ tracks }) => {
      const tracksRefined = tracks.items.map(t => t.preview_url)
      const tracksRefined2 = chooseRandom(tracksRefined, numSongs)
      console.log(tracksRefined2)
      return dispatch(loadTracksDone(tracksRefined2))
    })
    .catch(err => dispatch(loadTracksFailure(err)))
