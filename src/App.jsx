import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import AdminHome from './pages/Admin/AdminHome'
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css';
import './charts/ChartjsConfig';

import { useEffect } from 'react';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>

      <Routes>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/' element={<AdminHome />}></Route>
      </Routes>

    </>
  )
}

export default App
