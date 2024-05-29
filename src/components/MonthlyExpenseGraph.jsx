import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); 

function MonthlyExpenseGraph({ storedToken, refreshKey }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/expenses`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
                setExpenses(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchExpenses();
    }, [API_URL, storedToken, refreshKey]);


  useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/categories`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, [API_URL, storedToken]);

    const getCategoryName = (catId) => {
        const category = categories.find(category => category._id === catId);
        return category ? category.catName : 'Unknown Category';
    };

    const groupedExpenses = expenses.reduce((acc, expense) => {
        const categoryName = getCategoryName(expense.catId);
        if (!acc[categoryName]) {
            acc[categoryName] = 0;
        }
        acc[categoryName] += expense.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(groupedExpenses),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(groupedExpenses),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
                text: 'Expenses by Category',
            },
        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
}

export default MonthlyExpenseGraph