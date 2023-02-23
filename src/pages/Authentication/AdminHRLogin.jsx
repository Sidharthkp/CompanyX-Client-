import { LockClosedIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import { setAuthentication } from '../../redux/reducer/Authentication';

const LoginAdminHR = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [values, setValues] = useState({ email: "", password: "", secretCode: "empty" })
    const [passwordType, setPasswordType] = useState('password');

    const generateError = (err) => toast.error(err, {
        position: "bottom-right",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_IP_ADD}/login`, {
                ...values,
            }, {
                withCredentials: true
            });

            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else if (data.errMessage) {
                    generateError(data.errMessage)
                } else if (data.role === "admin") {
                    dispatch(setAuthentication())
                    navigate("/adminHome")
                } else if (data.role === "hr") {
                    dispatch(setAuthentication())
                    navigate("/hrHome")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    return (

        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Log in to your account
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
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Secret Key
                                </label>
                                <input
                                    id="secret"
                                    name="secretCode"
                                    type={passwordType}
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Enter your secret key"
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    onClick={togglePassword}
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
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
                                Log in
                            </button>
                        </div>
                        <div className='flex flex-row'>
                            <p className="font-medium text-indigo-600">
                                Don't have an account?
                            </p>
                            <Link to="/register" className='ml-2 font-bold'>Sign up</Link>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>


    )
}

export default LoginAdminHR