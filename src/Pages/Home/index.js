import React, {useState} from "react"
import { useNavigate } from 'react-router-dom'
import { Nav } from '../../components'
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import { Button , FormControl, InputLabel, Input, MenuItem, FormHelperText} from "@mui/material";
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';

import { socket } from '../../socket/index.js';
import './style.css'

const Home = () => {
  const navigate = useNavigate()

  const [joinFormactive, setjoinFormActive] = useState(0)
  const [createFormactive, setcreateFormActive] = useState(0)

  // ---------- useState to store input in INPUT FORM -------------
  const [name, setName] = React.useState('');
  const [room, setRoom] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeRoom = (e) => {
    setRoom(e.target.value)
  }

  const promptRoomInput = () => {
    setjoinFormActive(true)
  }

  const handleJoinGame = (e) => {
    e.preventDefault()

    const gameDetails =  {
      roomName: room,
      playerName: name
    }

    // implement check room name is available
    if (room !== "") {
      socket.emit("join", gameDetails, (res) => {
        
        console.log("socket response", res);

        if (res.code === "success") {
          navigate('/lobby', {state: {gameDetails}})
        } else {
          setRoom('');
        }
      })
    }

    console.log(`I will prompt user to questions page - Specific Room`)
    console.log(`Name stored in useState: ${name}`)
    console.log(`Room stored in useState: ${room}`)
    
  }
  
  // ------------- useState to store Input in CREATE FORM  -------------
  const [category, setCategory] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const [type, setType] = React.useState('');
  
  const promptCreateGame = () => {
    setcreateFormActive(true)
  }  
  
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleCreateGame =(e) => {
    e.preventDefault()

    const gameDetails =  {
      roomName: room,
      playerName: name,
      difficulty: difficulty,
      type: type,
      category: category

    }

    // implement check room name is available
    if (room !== "") {
      socket.emit("create", gameDetails, (res) => {
        
        console.log("socket response", res);

        if (res.code === "success") {
          navigate('/lobby', {state: {gameDetails}})
        } else {
          setRoom('');
        }
      })
    }

    console.log(`I will prompt user to questions page - New Quiz`)
    console.log(`Category stored in useState: ${category}`)
    console.log(`Difficulty stored in useState: ${difficulty}`)
    console.log(`Type stored in useState: ${type}`)
  }


  // ------------- Close Button  -------------
  
  const closePrompt = () => {
    setjoinFormActive(0)
    setcreateFormActive(0)
  }


  return (
    <div>
      <Nav />
      <section className="instructions">
        <h1>Instructions</h1>
        <h3>
            <ol>
                <li>Select a mode</li>
                <li>Each mode has 10 questions</li>
                <li>Top 10 winners will be on the scoreboard</li>
            </ol>
        </h3>
      </section>

      <main className="home-main">
        
        <motion.div className={(joinFormactive || createFormactive) ? 'joinGame square' : 'active joinGame square'}
        style={{backgroundColor: '#5ED6BE', color: 'white', boxShadow: '5px 5px 30px grey'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}
        onClick={promptRoomInput}
        >
            Join a Game
        </motion.div>

        <motion.div className={(joinFormactive || createFormactive) ? 'createGame square' : 'active createGame square'}
        style={{backgroundColor: '#DD92BF', color: 'white', boxShadow: '5px 5px 30px grey'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}
        onClick={promptCreateGame}
        >
            Create new Game
        </motion.div>
      </main>

        <div className={joinFormactive ? 'active inputForm-container' : 'inputForm-container'}  >
          <div style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '3rem'}}>
            <CloseIcon className='closeBtn' style={{right: '0px'}} onClick={closePrompt}/>
          </div>
          <div>

              <FormControl component="form" className='form' onSubmit={handleJoinGame} >
                <InputLabel htmlFor="name" aria-label="name"></InputLabel>
                <Input type="text" id="name"  aria-describedby="name" placeholder="Input your name"
                onChange={handleChangeName}></Input>
                <FormHelperText id="name">Input name</FormHelperText>

                <FormControl>
                <InputLabel htmlFor="room" aria-label="room"></InputLabel>
                <Input type="text" id="room"  aria-describedby="room number" placeholder="Input room number"
                onChange={handleChangeRoom}
                ></Input>
                </FormControl>
                <FormHelperText id="room">Input room</FormHelperText>

                <Button sx={{borderRadius: '20px', mt:4}} variant="contained" type="submit" color="success" endIcon={<SendIcon />}>Join Game</Button>
              </FormControl>

          </div>
        </div>
            {/* ----- NORMAL FORM WITHOUT MUI LIBRARY------  */}
            {/* <form className='form' onSubmit={handleJoinGame}>
              <label htmlFor="name" ></label>
              <input type="text" id="name" placeholder="Input your name"/>

              <label htmlFor="room" ></label>
              <input type="text" id="room" placeholder="Input room number"/>

              <input type="submit" value="Start Quiz" />

            </form> */}


       <div className={createFormactive ? 'active createForm-container' : 'createForm-container'}  >
          <div style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '3rem'}}>
            <CloseIcon className='closeBtn' style={{right: '0px'}} onClick={closePrompt}/>
          </div>
          <div>

              <FormControl component="form" className='form' onSubmit={handleCreateGame} >
              <InputLabel htmlFor="name" aria-label="name"></InputLabel>
                <Input type="text" id="name"  aria-describedby="name" placeholder="Input your name"
                onChange={handleChangeName}></Input>
                <FormHelperText id="name">Input name</FormHelperText>

                <FormControl>
                <InputLabel htmlFor="room" aria-label="room"></InputLabel>
                <Input type="text" id="room"  aria-describedby="room number" placeholder="Input room number"
                onChange={handleChangeRoom}
                ></Input>
                </FormControl>
                <FormHelperText id="room">Input room</FormHelperText>
              

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={'9'}>General Knowledge</MenuItem>
                    <MenuItem value={'10'}>Entertainment: Books</MenuItem>
                    <MenuItem value={'11'}>Entertainment: Film</MenuItem>
                    <MenuItem value={'12'}>Entertainment: Music</MenuItem>
                    <MenuItem value={'13'}>Entertainment: Musicals & Theatres</MenuItem>
                    <MenuItem value={'14'}>Entertainment: Television</MenuItem>
                    <MenuItem value={'15'}>Entertainment: Video Games</MenuItem>
                    <MenuItem value={'16'}>Entertainment: Board Games</MenuItem>
                    <MenuItem value={'17'}>Science & Nature</MenuItem>
                    <MenuItem value={'18'}>Science: Computers</MenuItem>
                    <MenuItem value={'19'}>Science: Mathematics</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficulty}
                    label="Difficulty"
                    onChange={handleChangeDifficulty}
                  >
                    <MenuItem value={'easy'}>Easy</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'hard'}>Hard</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Question Type"
                    onChange={handleChangeType}
                  >
                    <MenuItem value={'multiple'}>Multiple Choice</MenuItem>
                    <MenuItem value={'boolean'}>True/ False</MenuItem>
                  </Select>
                </FormControl>

                <Button sx={{borderRadius: '20px', mt:4}} variant="contained" type="submit" color="success" endIcon={<SendIcon />}>Create Game</Button>

              </FormControl>
          </div>
        </div>

        

    </div>
  )
};

export default Home;
