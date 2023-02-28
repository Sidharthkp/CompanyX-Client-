import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";

function Barchart() {
    const [basic, setBasic] = useState([]);
    const [insurance, setInsurance] = useState([]);
    const [CTC, setCTC] = useState([]);
    const [timeStamps, setTimeStamps] = useState([]);
    const [employee, setEmployee] = useState([]);

    const getSlip = async () => {
        const res = await axios.get(`${import.meta.env.VITE_IP_ADD}/admin/getSalaryDetails`);
        setBasic(res.data.basic)
        setInsurance(res.data.insurance)
        setCTC(res.data.CTC)
        setTimeStamps(res.data.timeStamps)
        setEmployee(res.data.employee)
    }

    const labels = employee

    const data = {
        labels: labels,
        datasets: [
            {
                label: "CTC",
                backgroundColor: "rgb(176,196,222)",
                borderColor: "rgb(112,128,144)",
                data: basic,
            },
            {
                label: "BASIC",
                backgroundColor: "rgb(188,143,143)",
                borderColor: "rgb(255,228,181)",
                data: basic,
            },
        ],
    };

    useEffect(() => {
        getSlip()
    }, [])

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Employee</h2>
            </header>
            <Bar data={data} width={595} height={248} />

        </div>
    );
}

export default Barchart;
