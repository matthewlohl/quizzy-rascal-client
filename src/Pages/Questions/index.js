import { Grid, Paper } from "@mui/material";
// import { Grid, Row, Col } from 'rsuite';
import axios from "axios";
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import './style.css'


const Questions = () => {
    const [questionsData, setQuestionsData] = useState([])


    useEffect(() => {
        const fetchQuestions = async() => {
            try {
              console.log(`grabbing from API`)
              const data = await axios.get(`https://opentdb.com/api.php?amount=10`)
              var questions = data.data.results
              setQuestionsData(questions)
              
            } catch (error) {
              console.log(error)           
            }
        }
        fetchQuestions()
    }, [])


    const renderQuestions = questionsData.map((question, index) => {
        var choice= [question.correct_answer]
        const wrong = question.incorrect_answers
        wrong.forEach((item) => {
            choice.push(item)
        })

        let shuffledChoice = choice.sort(function() {
            return Math.random() - 0.5;
        })
        const renderChoice = shuffledChoice.map((item, index) => {
            return(
                <Grid item xs={6} key={index}>
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: '#6A5AE0', color: 'aliceblue'}} transition={{ type: "spring", stiffness: 100, damping: 10 }} className="choice">{item}</motion.div>
                </Grid>
            )
        })

        return(
            <div className="question-container" key={index}>
                <h1>Question {index+1}</h1>
                <div className="question-card">
                    <h2 style={{textAlign: 'center'}}>{question.question}</h2>
                    {/* <p>{shuffledChoice}</p> */}
                    <p style={{color: 'aliceblue'}}>Correct: {question.correct_answer}</p>
                    {/* <p>Wrong: {question.incorrect_answers}</p> */}

                    <form action="">
                    <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {renderChoice}
                    </Grid>
                    </form>

                </div>
            </div>
        )
    }) 
    

  return (
    <main className="questions-section">
      {renderQuestions}
     
    </main>
  )
};

export default Questions;
