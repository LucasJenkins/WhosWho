import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import './index.css'
import player from '../../components/player'
import { Link } from 'react-router-dom'

import {
  loadGenres,
  selectGenre,
  selectNumArtists,
  selectNumSongs,
  loadArtistByGenres
} from '../../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadGenres()
  }

  render () {
    const genres = this.props.genres.map(genres => (
      <option key={genres} value={genres}>
        {genres}
      </option>
    ))

    return (
      <div className='landing'>
        <select onChange={event => this.props.selectGenre(event.target.value)}>
          {genres}
        </select>
        <br />
        <h6>Select Number of Songs</h6>
        <br />
        <select
          onChange={event => this.props.selectNumSongs(event.target.value)}
        >
          <option key='1' value='1'>
            1
          </option>
          <option key='2' value='2'>
            2
          </option>
          <option key='3' value='3'>
            3
          </option>
        </select>
        <br />
        <h6>Select Number of Artist</h6>
        <br />
        <select
          onChange={event =>
            console.log(this.props.selectNumArtists(event.target.value))
          }
        >
          <option key='2' value='2'>
            2
          </option>
          <option key='3' value='3'>
            3
          </option>
          <option key='4' value='4'>
            4
          </option>
        </select>
        <Link to='/gamepage'>
          <button>Begin Game</button>
        </Link>
      </div>
    )
  }
}

Home.propTypes = {
  loadGenres: PropTypes.func.isRequired,
  selectGenre: PropTypes.func.isRequired,
  loadArtistByGenres: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  genres: state.config.genres,
  artists: state.config.artists,
  numArtists: state.config.numArtists,
  numSongs: state.config.numSongs,
  genre: state.config.genre,
  correctAnswer: state.config.correctAnswer,
  selectedAnswer: state.config.selectedAnswer
})

const mapDispatchToProps = dispatch => ({
  loadGenres: () => dispatch(loadGenres()),
  selectGenre: genre => dispatch(selectGenre(genre)),
  selectNumSongs: number => dispatch(selectNumSongs(number)),
  selectNumArtists: number => dispatch(selectNumArtists(number)),
  loadArtistByGenres: (genre, numArtists) =>
    dispatch(loadArtistByGenres(genre, numArtists))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
