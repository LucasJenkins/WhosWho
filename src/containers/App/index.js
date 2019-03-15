import React from 'react'
import { Route } from 'react-router-dom'

import Header from '../../components/Header'
import Home from '../Home'
import GamePage from '../Game/GamePage'

const App = props => (
  <div>
    <Route path='/gamepage' component={GamePage} />
    <Route exact path='/' component={Home} />
  </div>
)

export default App
