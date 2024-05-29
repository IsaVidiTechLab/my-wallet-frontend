import axios from 'axios';
import React, { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function AllCategories({ storedToken, onEdit, categories, setCategories, refreshKey }) {
  const API_URL = import.meta.env.VITE_API_URL;


    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setCategories(response.data);
        refreshKey();
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
        fetchCategories();
    }, [API_URL, storedToken]);

    
  


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      onEdit();
      refreshKey();
    } catch (error) {
      console.error("Category not deleted", error);
    }
  };

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="text-blue-700">
            {category.catName}
            <FaEdit onClick={() => onEdit(category)} className="inline ml-2 cursor-pointer" />
            <FaTrash onClick={() => handleDelete(category._id)} className="inline ml-2 cursor-pointer" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCategories;
