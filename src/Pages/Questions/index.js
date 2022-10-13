import React, { useState } from "react"
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

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    //could use ths to check everyone is finished
    const [complete, setComplete] = useState(true);

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


    const sendScore =() => {

        socket.emit("record", score, gameDetails, (res) => {
        

            if (res.code === "success") {
                console.log('Response from server via sockets', res);
                
            }
        })
        
    


    }

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}


		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
            sendScore();
            postToDB();
		}
	};


	return (
        <div className="questionBody">
            <div className='app'>
                {showScore ? (
                    <div className='score-section'>
                        <h2>{gameDetails.playerName}, you scored {score} out of {questions.length} in Category {gameDetails.category}</h2>
                        {/* may want an extra results page to show what everyone in the room got - but will need to update scores in class first */}

                        {(complete) ? <button onClick={() => navigate('/results', {state: {gameDetails}})}>Go to results</button> : <h3>Please wait for all players to finish.</h3>}

                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption, idx) => (
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
