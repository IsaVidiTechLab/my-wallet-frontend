import React, { useState } from 'react';
import AddCategory from '../components/AddCategory';
import AllCategories from '../components/AllCategories';
import "../style/CategoryPage.css";

function CategoryPage() {
  const storedToken = localStorage.getItem("authToken");
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  }

  const handleEdit = (category) => {
    console.log('Editing category:', category); 
    setEditingCategory(category);
  };

  const handleCategoryChange = (updatedCategories) => {
    setCategories(updatedCategories);
  };

  return (
    <div className=' bg-midnight p-5 md:ml-60 h-svh pt-20 md:pt-10'>
      <h1 className=' font-semibold text-xl text-white'>Categories</h1>
      <AddCategory 
        storedToken={storedToken} 
        editingCategory={editingCategory} 
        setEditingCategory={setEditingCategory} 
        categories={categories} 
        setCategories={handleCategoryChange} 
        triggerRefresh={triggerRefresh}
      />
      <AllCategories 
        storedToken={storedToken} 
        onEdit={handleEdit} 
        categories={categories} 
        setCategories={handleCategoryChange}
        refreshKey={refreshKey} 
      />
    </div>
  );
}

export default CategoryPage;
