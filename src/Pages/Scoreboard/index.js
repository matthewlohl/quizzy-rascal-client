import React from "react"
import { Grid, Divider } from "@mui/material";
import trophyIcon from './trophy-icon.png';
import './style.css'

const Scoreboard = () => {

    const data = [
        {
            name: 'Liam',
            score: '8',
            date: '08/10/2022'
        },
        {
            name: 'Karl',
            score: '10',
            date: '09/10/2022'
        },
        {
            name: 'Matt',
            score: '5',
            date: '01/10/2022'
        },
        {
            name: 'Ayo',
            score: '9',
            date: '24/09/2022'
        },
        {
            name: 'Mike',
            score: '6',
            date: '28/05/2022'
        }
    ]

    // useEffect(() => {
    //     const fetchResult = async () => {
    //         try {
    //             // fetch from server
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // })
    const descending = data.sort((a,b) => b.score - a.score)
    console.log(descending)
    const renderResult = descending.map ((player) => {
        return (
            <>
            <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4} >
                    <div className="player-row">{player.name}</div>
                </Grid>
                <Grid item xs={4} >
                    <div className="player-row">{player.score}</div>
                </Grid>
                <Grid item xs={4} >
                    <div className="player-row">{player.date}</div>
                </Grid>
                </Grid>
            <Divider variant="middle" style={{background: 'white'}}/>
            </>
        )
    })



  return (
    <div className="scorepage">
    <section></section>
    <div className="imgContainer">
        <img className="trophy" src={trophyIcon} alt="trophy icon"></img>
    </div>
      <section className='score-board'>
        <h1 style={{textAlign: 'center', padding: '3rem 0rem'}}>Scoreboard</h1>
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
  )
};

export default Scoreboard;
