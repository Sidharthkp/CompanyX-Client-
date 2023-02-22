import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

function DashboardCard04() {
  const [basic, setBasic] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [CTC, setCTC] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);
  const [employee, setEmployee] = useState([]);

  const getSlip = async () => {
    const res = await axios.get(`https://${import.meta.env.VITE_IP_ADD}/admin/getSalaryDetails`);
    setBasic(res.data.basic)
    setInsurance(res.data.insurance)
    setCTC(res.data.CTC)
    setTimeStamps(res.data.timeStamps)
    setEmployee(res.data.employee)
  }

  const labels = timeStamps

  const data = {
    labels: labels,
    datasets: [
      {
        label: "BASIC",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: basic,
      },
      {
        label: "CTC",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: CTC,
      },
    ],
  };

  useEffect(() => {
    getSlip()
  }, [])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Basic VS CTC</h2>
      </header>

      <Line data={data} width={595} height={248} />

    </div>
  );
}

export default DashboardCard04;
