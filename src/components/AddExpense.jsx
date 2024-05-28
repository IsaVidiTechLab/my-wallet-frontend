import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';

function AddExpense({ storedToken, editingExpense, setEditingExpense }) {

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
            setDate(editingExpense.date.split('T')[0]); // Adjust date format if necessary
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
        } catch (error) {
            console.log(error);
        }

        clearFields();

        // console.log(`${title} ${amount} ${description} ${catId} ${date}`)
    }
  return (
    <div>
     <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <input
                type="date"
                name="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                required
            />
            <select
                name="catId"
                value={selectedCategory}
                onChange={handleCategoryChange}
                required
            >
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>
                        {category.catName}
                    </option>
                ))}
            </select>
            <textarea
                name="description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Description"
            />
            <button type="submit">{editingExpense ? 'Update Expense' : 'Save Expense'}</button>
        </form>
    </div>
  )
}

export default AddExpense
