import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({});
    const [basicSalary, setBasicSalary] = useState(0)
    const [reimbursements, setReimbursements] = useState(0)
    const [fixedAllowance, setFixedAllowance] = useState(0)
    const [incomeTax, setIncomeTax] = useState(0)
    const [insurance, setInsurance] = useState(0)
    const [overtime, setOvertime] = useState(0)
    const [half, setHalf] = useState(0)
    const [full, setFull] = useState(0)
    const [CTC, setCTC] = useState(0)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("q");
    const getUsers = async () => {
        const res = await axios.get(`http://localhost:4111/hr/getUserDetails?q=${id}`);
        setUser(res.data);
    }

    const ctc = async (e) => {
        e.preventDefault()
        let perHour = (parseInt(basicSalary) / 25) / 8;
        let earnings = parseInt(reimbursements) + perHour + parseInt(fixedAllowance);
        let deductions = parseInt(incomeTax) + parseInt(insurance);
        let overTime = perHour * parseInt(overtime);
        let leave = (full * (perHour * 8)) - (half * (perHour * 4))
        setCTC((earnings + deductions + overTime) - leave)
        await axios.post('http://localhost:4111/hr/userSalarySet', {
            id,
            basic: basicSalary,
            reimbursements,
            fixedAllowance,
            incomeTax,
            insurance,
            overTime,
            halfDay: half,
            fullDay: full,
            CTC
        }).then(() => {
            console.log("Send");
        }).catch((err) => {
            console.log(err.message);
        })
    }

    const goBack = (e) => {
        e.preventDefault();
        navigate("/")
    }

    useEffect(() => {
        getUsers()
    }, [])
    return (
        <section className=" py-1 bg-blueGray-50">
            <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">
                                Salary Structure
                            </h6>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Username
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.name ? user.name : "Name not provided"} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Email address
                                        </label>
                                        <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.email} />
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Earnings
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            BASIC
                                        </label>
                                        <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setBasicSalary(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Reimbursements
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setReimbursements(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            FIXED ALLOWANCE
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setFixedAllowance(e.target.value) }} />
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Deductions
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Income Tax
                                        </label>
                                        <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setIncomeTax(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Employee State Insurance
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setInsurance(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Performance
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            OVERTIME <span className="text-red-600">In hours</span>
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setOvertime(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Half Day leave <span className="text-red-600">In Days</span>
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setHalf(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Full Day leave <span className="text-red-600">In Days</span>
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => { setFull(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">

                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            MONTHLY CTC
                                        </label>
                                        <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={CTC} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3 flex flex-row justify-end">
                                        <button onClick={(e) => ctc(e)} className="bg-green-500 mt-8 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                            Submit
                                        </button>
                                        <button onClick={(e) => goBack(e)} className="bg-pink-500 mt-8 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                            Check another
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmployeeDetails;