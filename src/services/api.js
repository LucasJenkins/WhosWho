import toPairs from 'lodash/toPairs'

import request from '../utils/request'
import { getAccessTokenFromLocalStorage } from './auth'

const SPOTIFY_ROOT = 'https://api.spotify.com/v1'

export function fetchGenres () {
  return fetchFromSpotify({
    endpoint: 'recommendations/available-genre-seeds',
    params: {}
  })
}

export function fetchArtistByGenre (genre) {
  return fetchFromSpotify({
    endpoint: 'search',
    params: { q: 'genre%3A%20' + genre, type: 'artist', limit: '50' }
  })
}

export function fetchTracksByArtist (artist, numSongs) {
  return fetchFromSpotify({
    endpoint: 'search',
    params: { q: 'artist%3A%20' + artist, type: 'track', limit: '50' }
  })
}

export function fetchFromSpotify ({ endpoint, params }) {
  const spotifyToken = getAccessTokenFromLocalStorage()
  let url = [SPOTIFY_ROOT, endpoint].join('/')

  if (params) {
    const paramString = toPairs(params)
      .map(param => param.join('='))
      .join('&')
    url += `?${paramString}`
  }

  const options = { headers: { Authorization: `Bearer ${spotifyToken}` } }
  return request(url, options)
}
