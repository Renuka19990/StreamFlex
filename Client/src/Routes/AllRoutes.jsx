import { Box } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Browse from '../Pages/Browse'
import MyList from '../Pages/MyList'
import LiveEvents from '../Pages/LiveEvents'
import Chat from '../Pages/Chat'
import ManageContent from '../Pages/ManageContent'
import Login from '../Pages/Login'
import Signup from '../Pages/SignUp'


export default function AllRoutes() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/my-list' element={<MyList/>}/>
        <Route path='/live-events' element={<LiveEvents/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/manage-content' element={<ManageContent/>}/>
      </Routes>
    </Box>
  )
}

