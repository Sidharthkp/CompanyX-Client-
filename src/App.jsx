import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Authentication/Login'
import AdminHome from './pages/Admin/AdminHome'
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css';
import { useEffect, useState } from 'react';
import HRHome from './pages/HR/HRHome';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setAuthentication, setNotAuthenticated } from './redux/reducer/Authentication';
import axios from 'axios';
import Error from './pages/Error';
import EmployeeHome from './pages/Employees/EmployeeHome';
// import { auth } from './firebase/Config'
// import { onAuthStateChanged } from 'firebase/auth';
import EmployeeDetails from './pages/HR/EmployeeDetails';
import SlipDetails from './pages/Employees/slipDetails';
import DashboardCardEmployeeDetails from './partials/dashboard/HR/Userpayslips';
import SlipDetailsHR from './partials/dashboard/HR/slipDetailsHR';
import SlipDetailsHREdit from './partials/dashboard/HR/EditSlipHR';

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.authentication.authenticated);
  const [cookies, removeCookie] = useCookies([]);
  const [role, setRole] = useState("");
  const [secretGoogle, setSecretGoogle] = useState(false)
  const authent = async () => {
    if (localStorage.getItem("email")) {
      let email = localStorage.getItem("email")
      const { data } = await axios.post(`${import.meta.env.VITE_IP_ADD}`, { email })
      // console.log(data);
      if (data.role) {
        setRole(data.role)
      } else {
        setRole("");
      }
      dispatch(setAuthentication())
    } else {
      setRole("");
      dispatch(setNotAuthenticated())
    }
  }

  // // const authStateCheck = () => {
  // //   onAuthStateChanged(auth, (user) => {
  // //     if (!user || !user.emailVerified) {
  // //       setSecretGoogle(false)
  // //     } else {
  // //       setSecretGoogle(true)
  // //     }
  // //   })
  // // }
  // // const authStateListener = () => {
  // //   onAuthStateChanged(auth, (user) => {
  // //     if (!user || !user.emailVerified) {
  // //       setSecretGoogle(false)
  // //       return dispatch(setNotAuthenticated())
  // //     }
  // //     setSecretGoogle(true)
  // //     return dispatch(setAuthentication())
  // //   })
  // // }
  // const verifyUser = async () => {
  //   // if (!cookies.jwt) {
  //   //   dispatch(setNotAuthenticated())
  //   // } else {
  //   const { data } = await axios.post(`${import.meta.env.VITE_IP_ADD}`, {}, {
  //     withCredentials: true
  //   });
  //   // if (!data.status) {
  //     // removeCookie("jwt");
  //     // dispatch(setNotAuthenticated())
  //   // } else {
  //     setRole(data.role)
  //     dispatch(setAuthentication())
  //   // }
  //   // }
  // };
  // useEffect(() => {
  //   // authStateCheck()
  //   verifyUser()
  //   // if (secretGoogle) {
  //   //   authStateListener()
  //   // } else {
  //   // }
  // }, [cookies, navigate, removeCookie])

  useEffect(() => {
    authent()
  }, [authenticated])

  return (
    <>

      <Routes>
        <Route exact path='/' element={!authenticated ? <Login /> : role === "admin" ? <AdminHome /> : role === "hr" ? <HRHome /> : <EmployeeHome />}></Route>
        {/* <Route exact path='/register' element={!authenticated ? <Register /> : role === "admin" ? <AdminHome /> : role === "hr" ? <HRHome /> : <EmployeeHome />}></Route> */}
        <Route exact path='/adminHome' element={<AdminHome />}></Route>
        {/* <Route exact path='/adminhrlogin' element={!authenticated ? <LoginAdminHR /> : role === "admin" ? <AdminHome /> : role === "hr" ? <HRHome /> : <EmployeeHome />}></Route> */}
        <Route exact path='/hrHome' element={<HRHome />}></Route>
        <Route exact path='/employeeDetails' element={<EmployeeDetails />}></Route>
        <Route exact path='/paySlip' element={<DashboardCardEmployeeDetails />}></Route>
        <Route exact path='/employeeHome' element={<EmployeeHome />}></Route>
        <Route exact path='/slipDetails' element={<SlipDetails />}></Route>
        <Route exact path='/slipDetailsHR' element={<SlipDetailsHR />}></Route>
        <Route exact path='/slipDetailsHREdit' element={<SlipDetailsHREdit />}></Route>
        <Route exact path='' element={<SlipDetailsHR />}></Route>
        <Route exact path='*' element={<Error />}></Route>
      </Routes>

    </>
  )
}

export default App
