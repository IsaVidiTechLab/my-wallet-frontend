import axios from 'axios';
import React, { useEffect, useState } from 'react';
function AllExpenses({ storedToken, onEdit, refreshKey }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/expenses`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            });
            setExpenses(response.data.reverse());
            console.log("AllExpense expense", response.data);
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
            console.log("AllExpense categories", response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, [API_URL, storedToken]);
    useEffect(() => {
        fetchExpenses();
    }, [API_URL, storedToken, refreshKey]);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            onEdit();
            refreshKey();
        } catch (error) {
            console.log(error);
        }
    };
    const getCategoryName = (catId) => {
        const category = categories.find(category => category._id === catId);
        return category ? category.catName : 'Unknown Category';
    };


    const indexOfLastExpense = currentPage * itemsPerPage;
    const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
    const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

    const totalPages = Math.ceil(expenses.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                    {currentExpenses.map(expense => (
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
            <div className='flex justify-center' style={{ marginTop: "20px" }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handleClick(index + 1)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            backgroundColor: currentPage === index + 1 ? '#76ABAE' : '#eeeeee',
                            color: currentPage === index + 1 ? '#ffffff' : '#007bff',
                            border: '1px solid #76ABAE',
                            cursor: 'pointer'
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
export default AllExpenses;