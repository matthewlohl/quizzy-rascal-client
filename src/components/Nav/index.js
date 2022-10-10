import React from "react";
import logo from './quizzy-rascal-logo.png';
import { Grid, Avatar} from "@mui/material";

import './style.css'

const Nav = () => {

  return (
    <header style={{backgroundColor: 'white'}}>

      <Grid container
      style={{alignItems: 'center', justifyContent: 'center'}}
      >
        <Avatar item alt="logo" src={logo} sx={{width: 100, height: 100}}/>
        <p item style={{color: 'gray', fontWeight: '500', textTransform: 'uppercase'}} >Quizzy Rascal</p>
      </Grid>

     


    </header>
  )
};

export default Nav;
