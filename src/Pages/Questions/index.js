import axios from "axios";
import React, { useEffect } from "react"
import './style.css'


const Questions = () => {

    useEffect(() => {
        const fetchQuestions = async() => {
            try {
              console.log(`grabbing from API`)
              const data = await axios.get(`https://opentdb.com/api.php?amount=10`)
              const questions = data.data.results
              console.log(questions)
              
            } catch (error) {
              console.log(error)           
            }
        }
        fetchQuestions()
    }, [])
    

  return (
    <main className="questions-section">
      questions here
    </main>
  )
};

export default Questions;
