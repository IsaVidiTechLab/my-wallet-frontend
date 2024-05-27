import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';

function AddExpense(props) {

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
            .get(`${API_URL}/api/categories`, { headers: { Authorization: `Bearer ${props.storedToken}`} })
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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCatId(e.target.value);
    };

    const clearFields = () =>{
        setTitle("");
        setAmount("");
        setSelectedCategory("");
        setDate("");
        setDescription("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            title : title,
            amount : amount,
            userId : user._id,
            catId : catId,
            date : date,
            description : description
        }

        axios
        .post(`${API_URL}/api/expenses`, requestBody, {
          headers: { Authorization: `Bearer ${props.storedToken}` },
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
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
            <button type="submit">Save Expense</button>
        </form>
    </div>
  )
}

export default AddExpense
