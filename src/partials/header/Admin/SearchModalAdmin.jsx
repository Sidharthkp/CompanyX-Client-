import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../../utils/Transition';

function SearchModalAdmin({
  id,
  searchId,
  modalOpen,
  setModalOpen
}) {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  let currentDate = new Date();

  const customers = users

  const getUsers = async () => {
    const res = await axios.get(`https://${import.meta.env.VITE_IP_ADD}/hr/getUsers`);
    setUsers(res.data);
  }

  const action = async (id) => {
    await axios.post(`https://${import.meta.env.VITE_IP_ADD}/admin/accessControll`, { id })
      .then((data) => {
        console.log("Done");
      }).catch((err) => {
        console.log(err);
      })
  }

  const searchData = (data) => {
    return search === ""
      ? data
      : data.email.toLowerCase().includes(search)
  }

  const modalContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const checkCTC = (salary) => {
    let boolean = false
    salary.map((d) => {
      let newDate = new Date(d.timeStamps)
      let difference = newDate.getTime() - currentDate.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      if (TotalDays > 25) {
        boolean = true
      }
    })
    return boolean
  }

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    getUsers()
    modalOpen && searchInput.current.focus();
  }, [modalOpen, search, action]);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div ref={modalContent} className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
          {/* Search form */}
          <form className="border-b border-slate-200">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">Search</label>
              <input id={searchId}
                onChange={(e) => {
                  let searchValue = e.target.value.toLocaleLowerCase();
                  setSearch(searchValue)
                }}
                className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="search" placeholder="Search Anything…" ref={searchInput} />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-4 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>
          <div className="py-4 px-2">
            {/* Recent pages */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-slate-400 uppercase px-2 mb-2">Employees</div>
              <ul className="text-sm">
                {
                  customers.filter(searchData).map(customer => {
                    return (
                      <li key={customer._id}>
                        <div className='relative flex flex-row justify-start w-full'>
                          {
                            customer.access === false ?

                              customer._id != "63f3b8a8c4ef32ea9b001cc3" && (<div className='absolute'>
                                <button onClick={() => action(customer._id)} className='bg-blue-600 mt-4 absolute text-white font-bold w-16 z-40 rounded-2xl h-8 flex flex-row justify-center'>
                                  <a className='my-2 text-xs'>Un Block</a>

                                </button>
                              </div>)

                              :

                              customer._id != "63f3b8a8c4ef32ea9b001cc3" && (<div className='absolute'>
                                <button onClick={() => action(customer._id)} className='bg-red-600 mt-4 absolute text-white text-center font-bold w-16 z-40 rounded-2xl h-8 flex flex-row justify-center'>
                                  <a className='my-2 text-xs'>Block</a>
                                </button>
                              </div>)

                          }
                        </div>
                        <Link
                          className="flex items-center p-2 text-slate-800 hover:text-white  hover:bg-indigo-500 rounded group"
                          to={{
                            pathname: "/employeeDetails",
                            search: `?q=${customer._id}`
                          }}
                          onClick={() => setModalOpen(!modalOpen)}
                        >
                          <div className="w-10 h-10 shrink-0 mr-5">
                          </div>
                          <span className='flex flex-row justify-around w-full'>
                            <div className=' flex flex-row justify-start w-full'>
                              <span className="font-medium text-slate-800 group-hover:text-white">{customer.email}</span>
                            </div>
                            <div className=' flex flex-row justify-start w-full mx-2'>
                              {
                                checkCTC(customer.salaryStructure) ? "Slip provided" : "Slip not provided"
                              }
                            </div>
                            <div className='w-2/6 font-bold'>
                              {customer.roles === "hr" && (
                                <div className='bg-orange-600 w-full h-full flex flex-row justify-center'>
                                  HR
                                </div>
                              )}
                              {customer.roles === "admin" && (
                                <div className='bg-red-600 w-full h-full flex flex-row justify-center'>
                                  Admin
                                </div>
                              )}
                              {!customer.roles && (
                                <div className='bg-green-600 w-full h-full flex flex-row justify-center'>
                                  Employee
                                </div>
                              )}
                            </div>
                          </span>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default SearchModalAdmin;
