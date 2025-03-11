import React from 'react'

import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Signup from './Home/Signup'
import Main from './Home/Main'
import Signin from './Home/Signin'
import DashBoard from './Owners/DashBoard'
import Admindashboard from './Admin/Admindashboard'
import Userdashboard from './Users/Userdashboard'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/signin' element={<Signup/>} />
          <Route path='/signup' element={<Signin/>} />
          <Route path='/ownerdashboard' element={<DashBoard/>} />
          <Route path='/admindashboard' element={<Admindashboard/>} />
          <Route path='/userdashboard' element={<Userdashboard/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  )
}

export default App
