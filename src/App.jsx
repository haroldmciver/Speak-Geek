import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './componets/navbar'
import Speaktool from './pages/Speaktool'
import Problems from './pages/Problems'
import QComponent from './componets/Qcomponent'
import Leetcode from './pages/Leetcode'
import LoginPage from './pages/login'; 
import SignUpPage from './pages/signup'; 
import Logout from './pages/logout';



function App() {

  return (
          <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='Speaktool' element={<Speaktool />}>
                  <Route path='problemset' element={<Problems />}/>
                  <Route path='problemset/:id' element={<QComponent />}/>
                  <Route path='leetcode' element={<Leetcode />}>
                  </Route>
                </Route>
            </Routes>
          </Router>
  )
}

export default App
