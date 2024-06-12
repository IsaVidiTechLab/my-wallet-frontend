import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';

function AddExpense({ storedToken, editingExpense, setEditingExpense,triggerRefresh }) {

    const API_URL = import.meta.env.VITE_API_URL

    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [catId, setCatId] = useState("");


    useEffect(()=>{
        const fetchCategories = () => {
            axios
            .get(`${API_URL}/api/categories`, { headers: { Authorization: `Bearer ${storedToken}`} })
            .then((response) => {
              setCategories(response.data);
              console.log(response.data)
            })
            .catch((error) => {
              console.log(error);
            });

        }
        fetchCategories();
    },[])

    useEffect(() => {
        if (editingExpense) {
            setTitle(editingExpense.title);
            setAmount(editingExpense.amount);
            setDescription(editingExpense.description);
            setDate(editingExpense.date.split('T')[0]); 
            setSelectedCategory(editingExpense.catId);
            setCatId(editingExpense.catId);
        }
    }, [editingExpense]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCatId(e.target.value);
    };

    const clearFields = () =>{
        setTitle("");
        setAmount("");
        setSelectedCategory("");
        setDate("");
        setDescription("");
        setEditingExpense(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            title : title,
            amount : amount,
            userId : user._id,
            catId : catId,
            date : date,
            description : description
        }

        try {
            if (editingExpense) {
                const response = await axios.put(`${API_URL}/api/expenses/${editingExpense._id}`, requestBody, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });
                console.log('Updated Expense:', response.data);
            } else {
                const response = await axios.post(`${API_URL}/api/expenses`, requestBody, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });
                console.log('New Expense:', response.data);
            }
            triggerRefresh();
        } catch (error) {
            console.log(error);
        }

        clearFields();

    }
  return (
    <div className='add-expense'>
     <form className=' add-expense-form' onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                className='border border-lightblue text-gray-900 text-sm rounded-lg block w-full p-2.5 '
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="number"
                name="amount"
                className='border border-lightblue text-gray-900 text-sm rounded-lg block w-full p-2.5 '
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <input
                type="date"
                name="date"
                className='border border-lightblue text-sm rounded-lg block w-full p-2.5 '
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                required
            />
            <select
                name="catId"
                value={selectedCategory}
                className='border border-lightblue text-gray-900 text-sm rounded-lg block w-full p-2.5 '
                onChange={handleCategoryChange}
                required
            >
                <option className='text-gray' value="">Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>
                        {category.catName}
                    </option>
                ))}
            </select>
            <textarea
                name="description"
                value={description}
                className='border border-lightblue text-gray-900 text-sm rounded-lg block w-full p-2.5 '
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Remarks"
            />
            <button className='text-white bg-lightblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ' type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
        </form>
    </div>
  )
}

export default AddExpense
