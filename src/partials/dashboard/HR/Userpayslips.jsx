import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../../firebase/Config';

function DashboardCardEmployeeDetails() {
    let userID
    const location = useLocation()
    if (location?.state != null) {
        userID = location?.state.id
    }
    const [slips, setSlips] = useState([]);

    const getUsers = async () => {
        let id = userID
        const res = await axios.post(`${import.meta.env.VITE_IP_ADD}/employee/getSalarySlip`, { id });
        setSlips(res.data);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Salary slips</h2>
            </header>
            <div className="p-3">

                {/* Table */}
                <div className="overflow-x-auto h-96">
                    <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Issued date</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Slip id</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">CTC</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Action</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm divide-y divide-slate-100">
                            {
                                slips.map(slips => {
                                    return (
                                        <tr key={slips._id}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{slips.timeStamps}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{slips._id}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center">{slips.CTC}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap flex flex-row justify-center">
                                                <Link to={{
                                                    pathname: "/slipDetailsHR",
                                                    search: `?q=${slips._id}`
                                                }}
                                                state={{id: userID}}
                                                >
                                                    <button className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                                                        Details
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    );
}

export default DashboardCardEmployeeDetails;
