import React, { useEffect, useState } from "react"
import { Button, Grid, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios'
import trophyIcon from './trophy-icon.png';
import Dropdown from '../../components/Dropdown'
import './style.css'

const Scoreboard = () => {
    const [data, setData] = useState([])

    const options = [
        { label: 'All', value:""},
        { label: 'General Knowledge', value: 'genKnow' },
        { label: 'Books', value: 'books' },
        { label: 'Film', value: 'film' },
        { label: 'Music', value: 'music' },
        { label: 'Musicals & Theatre', value: 'musicals' },
        { label: 'Television', value: 'tv' },
        { label: 'Video Games', value: 'vg' },
        { label: 'Board Games', value: 'bg' },
        { label: 'Science & Nature', value: 'science' },
        { label: 'Computers', value: 'computers' },
        { label: 'Mathematics', value: 'maths' }
      ];

    const [category, setCategory] = useState("")

    // const data = [
    //     {
    //         name: 'Liam',
    //         score: '8',
    //         date: '08/10/2022'
    //     },
    //     {
    //         name: 'Karl',
    //         score: '10',
    //         date: '09/10/2022'
    //     },
    //     {
    //         name: 'Matt',
    //         score: '5',
    //         date: '01/10/2022'
    //     },
    //     {
    //         name: 'Ayo',
    //         score: '9',
    //         date: '24/09/2022'
    //     },
    //     {
    //         name: 'Mike',
    //         score: '6',
    //         date: '28/05/2022'
    //     }
    // ]

    useEffect(() => {
        const fetchHighScore = async() => {
          try {
            const { data } = await axios.get(`https://quizzy-rascal-server.herokuapp.com/players/${category}`)
            // const { data } = await axios.get(`http://localhost:8080/players/${category}`)
            setData(data)
          } catch (error) {
            console.log(error)
          } 
        }
    
        fetchHighScore();
        //only run useEffect when the category state changes
    }, [category])

    
    const handleDropdown = (e) => {
        setCategory(e.target.value)
    }

    const descending = data.sort((a,b) => b.highScore - a.highScore)
    const renderResult = descending.slice(0, 10).map ((player) => {
        let convertedDate = new Date(player.createdAt).toLocaleDateString('en-GB')
        return (
            <div key={player._id}>
            <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4} >
                    <div className="player-row">{player.name}</div>
                </Grid>
                <Grid item xs={4} >
                    <div className="player-row">{player.highScore}</div>
                </Grid>
                <Grid item xs={4} >
                    
                    <div className="player-row">{convertedDate}</div>
                </Grid>
            </Grid>
            <Divider variant="middle" style={{background: 'white'}}/>
            </div>
        )
    })



  return (
    <>
    <Link to='/'><Button variant="outlined" className="backHomeBtn" sx={{position: 'absolute', marginTop: '4rem'}}>Back to Home</Button></Link>

    <div className="scorepage">
    <section></section>
    <div className="imgContainer">
        <img className="trophy" src={trophyIcon} alt="trophy icon"></img>
    </div>
      <section className='score-board'>
        <h1 style={{textAlign: 'center', padding: '3rem 0rem'}}>Scoreboard</h1>
        <Dropdown
            label="Category: "
            options={options}
            value={category}
            onChange={handleDropdown}
        />
        <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4} >
                <div className="header-row">Name</div>
            </Grid>
            <Grid item xs={4} >
                <div className="header-row">Score</div>
            </Grid>
            <Grid item xs={4} >
                <div className="header-row">Date</div>
            </Grid>
  
        </Grid>
        <Divider variant="middle" style={{background: 'white'}}/>
            {renderResult}
      </section>
    </div>
    </>
  )
};

export default Scoreboard;
