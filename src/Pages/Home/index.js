import React, {useState} from "react"
import { Nav } from '../../components'
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import { Button , FormControl, InputLabel, Input, FormHelperText} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import './style.css'

const Home = () => {
  const [active, setActive] = useState(0)

  const promptRoomInput = () => {
   
    console.log(`clicked`)
    setActive(true)
  }

  const closePrompt = () => {
    setActive(undefined)
  }

  const handleJoinGame = (e) => {
    e.preventDefault()
    console.log(`submit form`)
    console.log(e)
    console.log(e.input.value)
    
    
  }



  return (
    <div>
      <Nav />
      <section className="instructions">
        <h1>Instructions</h1>
        <h3>
            <ol>
                <li>Select a mode</li>
                <li>Each mdoe has 10 questions</li>
                <li>Top 10 winners will be on the scoreboard</li>
            </ol>
        </h3>
      </section>

      <main className="home-main">
        
        <motion.div className={!active ? 'active joinGame square' : 'joinGame square'}
        style={{backgroundColor: '#5ED6BE', color: 'white', boxShadow: '5px 5px 30px grey'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}
        
        onClick={promptRoomInput}
        >
            Join a Game
        </motion.div>

        <motion.div className={!active ? 'active createGame square' : 'createGame square'}
        style={{backgroundColor: '#DD92BF', color: 'white', boxShadow: '5px 5px 30px grey'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}>
            Create new Game
        </motion.div>
      </main>

        <div className={active ? 'active form-container' : 'form-container'}  >
          <div style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '3rem'}}>
            <CloseIcon className='closeBtn' style={{right: '0px'}} onClick={closePrompt}/>
          </div>
          <div>

              <FormControl component="form" className='form' onSubmit={handleJoinGame} >
                <InputLabel htmlFor="name" aria-label="name"></InputLabel>
                <Input type="text" id="name"  aria-describedby="name" placeholder="Input your name"></Input>
                <FormHelperText id="name">Input name</FormHelperText>

                <FormControl>
                <InputLabel htmlFor="room" aria-label="room"></InputLabel>
                <Input type="text" id="room"  aria-describedby="room number" placeholder="Input room number"></Input>
                </FormControl>
                <FormHelperText id="room">Input room</FormHelperText>

                <Button sx={{borderRadius: '20px', mt:4}} variant="contained" type="submit" color="success" endIcon={<SendIcon />}>Join Game</Button>
              </FormControl>

            {/* ----- NORMAL FORM WITHOUT MUI LIBRARY------  */}
            {/* <form className='form' onSubmit={handleJoinGame}>
              <label htmlFor="name" ></label>
              <input type="text" id="name" placeholder="Input your name"/>

              <label htmlFor="room" ></label>
              <input type="text" id="room" placeholder="Input room number"/>

              <input type="submit" value="Start Quiz" />

            </form> */}


          </div>
        </div>

        

    </div>
  )
};

export default Home;
