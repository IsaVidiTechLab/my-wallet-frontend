import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { FaEdit, FaTrash } from 'react-icons/fa'; 

function AddCategory() {
  const { user } = useContext(AuthContext);
  const [catName, setCatName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      userId: user._id,
      catName: catName,
    };

    const method = editingCategory ? "PUT" : "POST";
    const url = editingCategory
      ? `${API_URL}/api/categories/${editingCategory._id}`
      : `${API_URL}/api/categories`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Category not ${editingCategory ? "updated" : "added"}`);
        }
      })
      .then((data) => {
        if (editingCategory) {
          setCategories(categories.map((cat) => (cat._id === editingCategory._id ? data : cat)));
        } else {
          setCategories([...categories, data]);
        }
        setCatName("");
        setEditingCategory(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`${API_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, [API_URL]);

  const handleEdit = (category) => {
    setCatName(category.catName);
    setEditingCategory(category);
  };

  const handleDelete = (categoryId) => {
    fetch(`${API_URL}/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setCategories(categories.filter((category) => category._id !== categoryId));
        } else {
          throw new Error("Category not deleted");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={catName}
          name="catName"
          id="category"
          placeholder="Category Name"
          required
          onChange={(e) => setCatName(e.target.value)}
        />
        <button type="submit">
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>
      <div>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="categories-list">
              {category.catName}
              <FaEdit onClick={() => handleEdit(category)} className="icon-edit" />
              <FaTrash onClick={() => handleDelete(category._id)} className="icon-delete"/>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AddCategory;
