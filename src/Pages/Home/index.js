import React from "react"
import { Nav } from '../../components'
import { motion } from "framer-motion";
import './style.css'

const Home = () => {

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
        
        <motion.div className="joinGame square"
        style={{backgroundColor: '#5ED6BE', color: 'white', boxShadow: '5px 5px 30px gray'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}>
            Join a Game
        </motion.div>

        <motion.div className="createGame square"
        style={{backgroundColor: '#DD92BF', color: 'white', boxShadow: '5px 5px 30px gray'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}>
            Create new Game
        </motion.div>

      </main>
    </div>
  )
};

export default Home;
