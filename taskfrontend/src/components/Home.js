import React from 'react'
import Tasks from './Tasks.js'

function Home(props) {
  return (
    <div>
      <Tasks showAlert={props.showAlert}/>
    </div>
  )
}

export default Home