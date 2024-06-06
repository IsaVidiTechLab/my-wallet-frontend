import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
        <div className='all-expenses'>
        <ul className='flex flex-col'>
        {currentExpenses.map((expense) => (
          <li key={expense._id} className="all-expense-card">  
            <p className='flex flex-col'>
                <p className='font-bold'>
                {expense.title}
                </p>
                 <p className='flex space-x-4'>
                    <p>
                     <b>Amount:</b> {expense.amount}
                    </p>
                    <p>
                    <b>Category:</b> {getCategoryName(expense.catId)}
                    </p>
                 </p>
                
            </p>
            <p>
              <FaEdit onClick={() => onEdit(expense)} className="inline ml-2 cursor-pointer hover:text-lightblue" />
              <FaTrash onClick={() => handleDelete(expense._id)} className="inline ml-2 cursor-pointer hover:text-red" />
            </p>
          </li>
        ))}
      </ul>
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