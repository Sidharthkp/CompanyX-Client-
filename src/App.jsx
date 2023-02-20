import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import AdminHome from './pages/Admin/AdminHome'
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css';
import './charts/ChartjsConfig';
import { useEffect, useState } from 'react';
import LoginAdminHR from './pages/Authentication/AdminHRLogin';
import HRHome from './pages/HR/HRHome';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setAuthentication, setNotAuthenticated } from './redux/reducer/Authentication';
import axios from 'axios';
import Error from './pages/Error';
import EmployeeHome from './pages/Employees/EmployeeHome';
import LandingPage from './pages/LandingPage';
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.authentication.authenticated);
  const [cookies, removeCookie] = useCookies([]);
  const [role, setRole] = useState("");
  const [secretGoogle, setSecretGoogle] = useState(false)

  const authStateCheck = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        setSecretGoogle(false)
      } else {
        setSecretGoogle(true)
      }
    })
  }
  const authStateListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        setSecretGoogle(false)
        return dispatch(setNotAuthenticated())
      }
      setSecretGoogle(true)
      return dispatch(setAuthentication())
    })
  }
  const verifyUser = async () => {
    if (!cookies.jwt) {
      dispatch(setNotAuthenticated())
    } else {
      const { data } = await axios.post("http://localhost:4111", {}, {
        withCredentials: true
      });
      if (!data.status) {
        removeCookie("jwt");
        dispatch(setNotAuthenticated())
      } else {
        setRole(data.role)
        dispatch(setAuthentication())
      }
    }
  };
  useEffect(() => {
    authStateCheck()
    if (secretGoogle) {
      authStateListener()
    } else {
      verifyUser()
    }
  }, [cookies, navigate, removeCookie])

  return (
    <>

      <Routes>
        <Route exact path='/login' element={!authenticated ? <Login /> : role === "admin" ? <AdminHome /> : role === "hr" ? <HRHome /> : <EmployeeHome />}></Route>
        <Route exact path='/register' element={!authenticated ? <Register /> : role === "admin" ? <AdminHome /> : role === "hr" ? <HRHome /> : <EmployeeHome />}></Route>
        <Route exact path='/adminHome' element={<AdminHome />}></Route>
        <Route exact path='/adminhrlogin' element={!authenticated ? <LoginAdminHR /> : role === "admin" ? <AdminHome /> : role === "hr" ? <HRHome /> : <EmployeeHome />}></Route>
        <Route exact path='/hrHome' element={<HRHome />}></Route>
        <Route exact path='/employeeHome' element={<EmployeeHome />}></Route>
        <Route exact path='/' element={!authenticated ? <LandingPage /> : role === "admin" ? <AdminHome /> : role === "hr" ? <HRHome /> : <EmployeeHome />}></Route>
        <Route exact path='*' element={<Error />}></Route>
      </Routes>

    </>
  )
}

export default App
