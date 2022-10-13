import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { socket } from '../../socket/index.js';

import './index.css';
// import { render } from "@testing-library/react";

const Questions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const questions = location.state.data
    const gameDetails = location.state.gameDetails

	// const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    //could use ths to check everyone is finished

    const [ticks, setTicks] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [pointsUpdate, setPointsUpdate] = useState([])

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

    // const sendScore =() => {

    //     socket.emit("record", score, gameDetails, (res) => {
        

    //         if (res.code === "success") {
    //             console.log('Response from server via sockets', res);
                
    //         }
    //     })
        
    

    // }

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}
    }

	// 	const nextQuestion = currentQuestion + 1;
	// 	if (nextQuestion < questions.length) {
	// 		setCurrentQuestion(nextQuestion);
	// 	} else {
	// 		setShowScore(true);
    //         sendScore();
    //         postToDB();
	// 	}
	// };

    useEffect(() => {
        socket.on('broadcastupdate', (update) => {
            setPointsUpdate(update)
            console.log(update)
            // setPoints(update.forEach(s => {
            //     return(<p>{s.playerName} has {s.score} points</p>)
            // }))
        })
        const timer = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            if (ticks === 9) {
                setTimeout(() => {
                    // sendScore();
                    postToDB();
                    navigate('/results', {state: {gameDetails}})
                }, 10000)
            }
            if (seconds === 10) {
        socket.emit("updatescores", {playerName: gameDetails.playerName, score: score, roomName: gameDetails.roomName})
        setShowScore(true)
        setTimeout(() => {
            setShowScore(false)
            setSeconds(0)
        }, 5000)
        setTicks(ticks => ticks + 1);
    }
    }, 1000)
    return() => clearInterval(timer)
    })
    
	return (
        <div className="questionBody">
            <div className='app'>
                {showScore ? (
                    // <div className='score-section'>
                    //     <h2>{gameDetails.playerName}, you scored {score} out of {questions.length} in Category {gameDetails.category}</h2>
                    //     {/* may want an extra results page to show what everyone in the room got - but will need to update scores in class first */}
                    //     {(complete) ? <button onClick={() => navigate('/results', {state: {gameDetails}})}>Go to results</button> : <h3>Please wait for all players to finish.</h3>}
                    // </div>
                    <div className='score-section'>
                       <h2>Latest Scores</h2> 
                       {pointsUpdate.sort((a, b) => b.score - a.score).map((result, index) => {
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
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {ticks + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[ticks].questionText}</div>
                            <div className='timer'>{10 - seconds}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[ticks].answerOptions.map((answerOption, idx) => (
                                <button key={idx} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
	);
}

export default Questions;
