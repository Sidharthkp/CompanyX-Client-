import axios from 'axios';
import React, { useEffect, useState } from 'react';

function DashboardCard10() {

  const [users, setUsers] = useState([]);
  let currentDate = new Date();
  const getUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_IP_ADD}/hr/getUsers`);
    setUsers(res.data);
  }

  const customers = users
  // {
  //   id: '0',
  //   image: Image01,
  //   name: 'Alex Shatov',
  //   email: 'alexshatov@gmail.com',
  //   location: '🇺🇸',
  //   spent: '$2,890.66',
  // },

  const checkCTC = (salary) => {
    let boolean = false
    salary.map((d) => {
      let newDate = new Date(d.timeStamps)
      let difference = newDate.getTime() - currentDate.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      if (TotalDays > 25) {
        boolean =  true
      }
    })
    if(salary.length === 0){
      boolean = true
    }
    return boolean
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Employees</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto h-96">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Profile</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Pay Slip Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Role</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                          <div className="font-medium text-slate-800">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap flex flex-row">
                        <div className="text-lg text-center">{
                          checkCTC(customer.salaryStructure) ? "Not Done" : "Done"
                        }</div>
                      </td>
                      <td className="p-2 whitespace-nowrap text-white">
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

export default DashboardCard10;
