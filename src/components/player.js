import React from 'react'
import { Howl, Howler } from 'howler'
import { Icon } from '@material-ui/core'

export const Player = props => {
  const sound = new Howl({
    src: props.tracks,
    html5: true
  })

  return (
    <div>
      <button onClick={() => sound.play()}>Play</button>
      <button onClick={() => sound.stop()}>Stop</button>
    </div>
  )
}

export default Player
