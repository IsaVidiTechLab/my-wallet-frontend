import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ImTextColor } from 'react-icons/im';
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
    const colors = [
        'rgba(255, 255, 255, 0.7)',
        'rgba(240, 230, 220, 0.7)',
        'rgba(220, 210, 220, 0.7)',
        'rgba(200, 160, 200, 0.7)',
        'rgba(180, 150, 180, 0.7)',
        'rgba(160, 160, 160, 0.7)',
        'rgba(255, 215, 0, 0.7)',
        'rgba(255, 235, 205, 0.7)',
        'rgba(255, 228, 196, 0.7)',
        'rgba(240, 230, 240, 0.7)',
        'rgba(255, 245, 238, 0.7)',
        'rgba(245, 255, 250, 0.7)',
        'rgba(255, 250, 240, 0.7)',
        'rgba(240, 255, 255, 0.7)',
        'rgba(240, 248, 255, 0.7)',
        'rgba(255, 250, 250, 0.7)',
    ];
    const borderColors = [
        'rgba(255, 255, 255, 1)',
        'rgba(240, 240, 240, 1)',
        'rgba(220, 220, 220, 1)',
        'rgba(200, 200, 200, 1)',
        'rgba(180, 180, 180, 1)',
        'rgba(160, 160, 160, 1)',
        'rgba(255, 215, 0, 1)',
        'rgba(255, 235, 205, 1)',
        'rgba(255, 228, 196, 1)',
        'rgba(240, 255, 240, 1)',
        'rgba(255, 245, 238, 1)',
        'rgba(245, 255, 250, 1)',
        'rgba(255, 250, 240, 1)',
        'rgba(240, 255, 255, 1)',
        'rgba(240, 248, 255, 1)',
        'rgba(255, 250, 250, 1)',
    ];
    const data = {
        labels: expenses.map(expense => expense.title),
        datasets: [
            {
                label: 'Expenses by Percentage',
                data: expenses.map(expense => ((expense.amount / totalAmount) * 100).toFixed(2)),
                backgroundColor: expenses.map((_, index) => colors[index % colors.length]),
                borderColor: expenses.map((_, index) => borderColors[index % borderColors.length]),
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 0.9)',
                },
            },
            title: {
                display: true,
                text: 'Expenses by Percentage of Total Spent',
                color: 'rgba(255, 255, 255, 0.9)',
            },
            tooltip: {
                bodyColor: 'rgba(255, 255, 255, 0.9)',
            },
        },
    };
    return (
        <div className='md:w-1/2 mt-5'>
            <Pie data={data} options={options} />
        </div>
    );
}
export default MonthlyExpenseGraph;