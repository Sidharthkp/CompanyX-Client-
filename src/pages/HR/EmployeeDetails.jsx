import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EmployeeDetails = () => {
    const [hoursWorked, setHoursWorked] = useState(0)
    const [user, setUser] = useState({});
    console.log(user);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("q");
    const getUsers = async () => {
        const res = await axios.get(`http://localhost:4111/hr/getUserDetails?q=${id}`);
        setUser(res.data);
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <input id="deductionPercentage1" type="text" />
    )
}

export default EmployeeDetails;