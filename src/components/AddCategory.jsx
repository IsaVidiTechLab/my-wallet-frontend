import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AddCategory({ storedToken, editingCategory, setEditingCategory, categories, setCategories, triggerRefresh }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [catName, setCatName] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (editingCategory) {
      setCatName(editingCategory.catName);
    }
  }, [editingCategory]);

  const clearFields = () => {
    setCatName("");
    setEditingCategory(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      catName,
      userId: user._id,
    };

    try {
      if (editingCategory) {
        const response = await axios.put(
          `${API_URL}/api/categories/${editingCategory._id}`,
          requestBody,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        const updatedCategories = categories.map((category) =>
          category._id === editingCategory._id ? response.data : category
        );
        setCategories(updatedCategories);
        console.log("Updated category:", response.data);
      } else {
        const response = await axios.post(
          `${API_URL}/api/categories`,
          requestBody,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setCategories([...categories, response.data]);
        triggerRefresh();
        console.log("New Category:", response.data);
      }
    } catch (error) {
      console.error(`Category not ${editingCategory ? "updated" : "added"}`, error);
    }

    clearFields();
  };

  return (
    <form onSubmit={handleSubmit} className="my-8">
      <input
        type="text"
        value={catName}
        name="catName"
        id="category"
        placeholder="Category Name"
        required
        onChange={(e) => setCatName(e.target.value)}
        className="p-2 border border-gray-100 rounded-lg mr-4"
      />
      <button type="submit" className="py-2 px-3 rounded-lg bg-lightblue text-white font-light hover:bg-white hover:text-darkgray">
        {editingCategory ? "Update Category" : "Add Category"}
      </button>
    </form>
  );
}

export default AddCategory;
