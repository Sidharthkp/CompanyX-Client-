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
    const [search, setSearch] = useState("");

    const getUsers = async () => {
        let id = userID
        const res = await axios.post(`${import.meta.env.VITE_IP_ADD}/employee/getSalarySlip`, { id });
        setSlips(res.data);
    }

    const searchData = (data) => {
        return search === ""
          ? data
          : data.timeStamps.includes(search)
      }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
            <form className="border-b border-slate-200">
                <div className="relative">
                    <label
                        // htmlFor={searchId} 
                        className="sr-only">Search</label>
                    <input
                        // id={searchId}
                        onChange={(e) => {
                            let searchValue = e.target.value.toLocaleLowerCase();
                            setSearch(searchValue)
                        }}
                        className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="search" placeholder="Search By date (yyyy-mm-dd)" 
                        // ref={searchInput}
                         />
                    <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                        <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-4 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                        </svg>
                    </button>
                </div>
            </form>

            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Salary slips</h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto h-screen">
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
                                slips.filter(searchData).map(slips => {
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
                                                    state={{ id: userID }}
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
