import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthlyExpenseGraph from '../components/MonthlyExpenseGraph';

function MonthlyReportPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const storedToken = localStorage.getItem("authToken");
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); 
    const [monthlyData, setMonthlyData] = useState([]);

    const fetchMonthlyExpenses = (selectedMonth) => {
        const [year, monthIndex] = selectedMonth.split('-');
        const requestBody = {
            year: parseInt(year),
            month: parseInt(monthIndex)
        };

        axios
            .post(`${API_URL}/api/expenses/monthlyReport`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                console.log('Monthly Report:', response.data);
                if (response.data && Array.isArray(response.data.expenses)) {
                    setMonthlyData(response.data.expenses);
                } else {
                    setMonthlyData([]);
                    console.error('Unexpected response data format:', response.data);
                }
            })
            .catch((error) => {
                console.log("Error while fetching Monthly Report", error);
                setMonthlyData([]); 
            });
    };

    useEffect(() => {
        fetchMonthlyExpenses(month); 
    }, [month]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMonthlyExpenses(month);
    };

    return (
        <div>
            <h1>Monthly Report</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="month"
                    name="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th style={{ padding: "10px" }}>Title</th>
                        <th style={{ padding: "10px" }}>Amount</th>
                        <th style={{ padding: "10px" }}>Date</th>
                        <th style={{ padding: "10px" }}>Description</th>
                        <th style={{ padding: "10px" }}>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyData.map((data) => (
                        <tr key={data._id}>
                            <td style={{ padding: "10px" }}>{data.title}</td>
                            <td style={{ padding: "10px" }}>{data.amount}</td>
                            <td style={{ padding: "10px" }}>{new Date(data.date).toLocaleDateString()}</td>
                            <td style={{ padding: "10px" }}>{data.description}</td>
                            <td style={{ padding: "10px" }}>{data.categoryName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <MonthlyExpenseGraph storedToken={storedToken} month={month} />
        </div>
    );
}

export default MonthlyReportPage;
