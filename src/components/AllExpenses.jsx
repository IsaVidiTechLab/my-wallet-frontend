import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AllExpenses({ storedToken, onEdit }) {
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
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/categories`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpenses();
        fetchCategories();
    }, [API_URL, storedToken,expenses]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryName = (catId) => {
        const category = categories.find(category => category._id === catId);
        return category ? category.catName : 'Unknown Category';
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense._id} style={{ padding: "10px" }}>
                            <td style={{ padding: "10px" }}>{expense.title}</td>
                            <td style={{ padding: "10px" }}>{expense.amount}</td>
                            <td style={{ padding: "10px" }}>{new Date(expense.date).toLocaleDateString()}</td>
                            <td style={{ padding: "10px" }}>{expense.description}</td>
                            <td style={{ padding: "10px" }}>{getCategoryName(expense.catId)}</td>
                            <td style={{ padding: "10px" }}>
                                <button onClick={() => onEdit(expense)}>Edit</button>
                            </td>
                            <td style={{ padding: "10px" }}>
                                <button onClick={() => handleDelete(expense._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllExpenses;