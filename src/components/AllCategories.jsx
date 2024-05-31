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
      console.log('Fetched categories:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [storedToken, refreshKey]); // Only re-fetch when storedToken or refreshKey changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log('Category deleted:', id);
      fetchCategories(); // Re-fetch categories after deletion
    } catch (error) {
      console.error('Category not deleted:', error);
    }
  };

  const handleEdit = async (category) => {
    try {
      await onEdit(category);
      console.log('Category edited:', category);
      fetchCategories(); // Re-fetch categories after edit
    } catch (error) {
      console.error('Category not edited:', error);
    }
  };

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="text-blue-700">
            {category.catName}
            <FaEdit onClick={() => handleEdit(category)} className="inline ml-2 cursor-pointer" />
            <FaTrash onClick={() => handleDelete(category._id)} className="inline ml-2 cursor-pointer" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCategories;
