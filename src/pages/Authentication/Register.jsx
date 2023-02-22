import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../../redux/reducer/Authentication';
import { auth, provider } from '../../firebase/Config';
import { signInWithPopup } from 'firebase/auth';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [values, setValues] = useState({ email: "", password: "" })
    const [passwordType, setPasswordType] = useState('password');

    const generateError = (err) => toast.error(err, {
        position: "bottom-right",
    })

    //google
    const google = (e) => {
        e.preventDefault()
        signInWithPopup(auth, provider).then((data) => {
            let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let passwordLength = 12;
            let password = "";
            for (let i = 0; i <= passwordLength; i++) {
                let randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
            axios.post("https://companyx.cyclic.app/register", { email: data.user.email, password: password })
                .then((res) => console.log(res)
                )
                .catch((err) => console.log(err));
            dispatch(setAuthentication())
            navigate("/");
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`https://${import.meta.env.VITE_IP_ADD}/register`, {
                ...values,
            }, {
                withCredentials: true
            });

            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    dispatch(setAuthentication())
                    navigate("/")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)} method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={passwordType}
                                    autoComplete="current-password"
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    onClick={togglePassword}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                {passwordType === "text" ? (
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Hide Password
                                    </label>
                                ) : (
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Show Password
                                    </label>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign up
                            </button>
                        </div>
                        <div className='flex flex-row'>
                            <p className="font-medium text-indigo-600">
                                Already have an account?
                            </p>
                            <Link to="/login" className='ml-2 font-bold'>Login</Link>
                        </div>
                    </form>
                    <div className='flex justify-center my-2'>
                        <button onClick={(e) => google(e)}
                            className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mr-3"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#fbc02d"
                                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                />
                                <path
                                    fill="#e53935"
                                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                                />
                                <path
                                    fill="#4caf50"
                                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                                />
                                <path
                                    fill="#1565c0"
                                    d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                                />
                            </svg>
                            Google
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>


    )
}

export default Register