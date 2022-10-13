import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../../socket/index.js';
import axios from 'axios'


const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameDetails = location.state.gameDetails
  const score = location.state.score
  const [results, setResults] = useState([])

  useEffect(() => {
    socket.emit("results", gameDetails.roomName)
    postToDB();
    socket.on("resultsData", (players) => {
      setResults(players)
    })

  }, [gameDetails])

  const postToDB = async () => {
    await axios.post('https://quizzy-rascal-server.herokuapp.com/players', {

        name: gameDetails.playerName,
        highScore: score,
        category: gameDetails.category
    },{
            headers: {
              'Content-Type': 'application/json'

            }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

  return (
    <div className="questionBody">
      
      <div className='app'>
        <div className='question-section'>
              <div>
                  <span>Quiz Results</span>
              </div>
              <div className='results'>
              {results.sort((a, b) => b.score - a.score).map((result, index) => {
                return(
                <div key={index} className="position">
                  <div>Placed: {index+1} </div>
                  <br/>
                  <div className="winner" >
                    <h4>{result.playerName}</h4>
                    <h5>{result.score} / 10</h5>
                  </div>
                </div>
              )})}
              
              </div>
              <div><button onClick={() => {navigate('/scoreboard')}}>See High Scores</button></div>
        </div>
      </div>
    </div>

  )
}

export default Results
