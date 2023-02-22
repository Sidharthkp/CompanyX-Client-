import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate()

    const employee = (e) => {
        e.preventDefault()
        navigate("/login")
    }

    const admin = (e) => {
        e.preventDefault()
        navigate("/adminhrlogin")
    }

    return (
        <div className="h-screen flex flex-row items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 justify-around w-full">
            <div className="flex flex-row  justify-around w-5/6 h-5/6 items-center rounded-2xl backdrop-blur bg-white/70">
                <div
                    className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl"
                >
                    <button onClick={(e) => employee(e)} className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
                        <div className="w-full flex flex-row justify-center">
                            <img src="/src/images/user.png" className="w-96" alt="" />
                        </div>
                        <div className="mt-16">
                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                Employee Login
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Employees can sign in here !!!
                            </p>
                        </div>
                    </button>
                </div>


                <div
                    className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl"
                >
                    <button onClick={(e) => admin(e)} className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
                        <div className="w-full flex flex-row justify-center">
                            <img src="/src/images/admin.png" className="w-96" alt="" />
                        </div>
                        <div className="mt-16">
                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                HR/Admin Login
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Admins can sign in here !!!
                            </p>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage