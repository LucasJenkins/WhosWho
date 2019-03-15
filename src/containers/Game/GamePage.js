import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import { Player } from '../../components/player'
import { chooseRandom, getRandomInt } from '../../utils/request'
import { Link } from 'react-router-dom'

import './GamePage.css'
import {
  loadGenres,
  selectGenres,
  selectGenre,
  selectNumArtists,
  selectNumSongs,
  loadArtistByGenres,
  loadTracksByArtists,
  loadCorrectAnswer,
  selectedAnswer
} from '../../ducks/config.duck'
import { IconButton } from '@material-ui/core'

class GamePage extends React.Component {
  componentDidMount () {
    this.props.loadArtistByGenres(this.props.genre, this.props.numArtists),
    this.props.loadCorrectAnswer(chooseRandom(this.props.artists, 1)),
    this.props.loadTracksByArtists(
      this.props.correctAnswer,
      this.props.numSongs
    )
  }

  render () {
    const card = this.props.artists.map(artist => (
      <div key={artist.name} value={artist.name}>
        <button
          onClick={event => this.props.selectedAnswer(event.target.value)}
        >
          <div>
            <img src={artist.images[1].url} alt='Avatar' />
          </div>
          <div className=''>
            <h4>{artist.name}</h4>
            <p>Artist</p>
          </div>
        </button>
      </div>
    ))

    return (
      <div className='wrapper'>
        <div className='items'>
          <Player tracks={this.props.tracks} />
        </div>
        <div className='items'>{card}</div>
        <div className='items'>
          <Link to='/'>
            <button>New Game</button>
          </Link>
        </div>
      </div>
    )
  }
}

GamePage.propTypes = {
  // loadGenres: PropTypes.func.isRequired,
  // selectGenre: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  genres: state.config.genres,
  artists: state.config.artists,
  numArtists: state.config.numArtists,
  numSongs: state.config.numSongs,
  genre: state.config.genre,
  tracks: state.config.tracks,
  correctAnswer: state.config.correctAnswer,
  selectedAnswer: state.config.selectedAnswer
})

const mapDispatchToProps = dispatch => ({
  loadGenres: () => dispatch(loadGenres()),
  selectGenre: genre => dispatch(selectGenre(genre)),
  selectNumSongs: number => dispatch(selectNumSongs(number)),
  selectNumArtists: number => dispatch(selectNumArtists(number)),
  loadArtistByGenres: (genre, numArtists) =>
    dispatch(loadArtistByGenres(genre, numArtists)),
  loadTracksByArtists: (artists, numSongs) =>
    dispatch(loadTracksByArtists(artists, numSongs)),
  loadCorrectAnswer: artist => dispatch(loadCorrectAnswer(artist)),
  selectedAnswer: artist => dispatch(selectedAnswer(artist))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage)
