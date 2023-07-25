import React, { useState } from 'react'
import "./Home.css"
import Navbar from '../Navbar/Navbar'
import { useHistory } from 'react-router-dom'

export  const Home = () => {

  const history = useHistory()
  const[Data,setData]= useState([])
  return (
    <Navbar>

    </Navbar>
  )
}

