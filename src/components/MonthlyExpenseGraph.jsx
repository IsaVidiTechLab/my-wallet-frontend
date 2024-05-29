import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function MonthlyExpenseGraph({ storedToken, month }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const [year, monthIndex] = month.split('-');
            const requestBody = {
                year: parseInt(year),
                month: parseInt(monthIndex)
            };

            try {
                const response = await axios.post(`${API_URL}/api/expenses/monthlyReport`, requestBody, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
                if (response.data && Array.isArray(response.data.expenses)) {
                    setExpenses(response.data.expenses);
                } else {
                    setExpenses([]);
                    console.error('Unexpected response data format:', response.data);
                }
            } catch (error) {
                console.log(error);
                setExpenses([]);
            }
        };
        fetchExpenses();
    }, [API_URL, storedToken, month]);

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const data = {
        labels: expenses.map(expense => expense.title),
        datasets: [
            {
                label: 'Expenses by Percentage',
                data: expenses.map(expense => ((expense.amount / totalAmount) * 100).toFixed(2)),
                backgroundColor: expenses.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`),
                borderColor: expenses.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenses by Percentage of Total Spent',
            },
        },
    };

    return (
        <div className='w-1/3'>
            <Pie data={data} options={options} />
        </div>
    );
}

export default MonthlyExpenseGraph;
