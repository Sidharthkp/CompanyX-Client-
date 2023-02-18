import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import Secret from './pages/authentication/Secret'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/' element={<Secret />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
