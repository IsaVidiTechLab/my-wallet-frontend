import React, { useState } from 'react';
import AddCategory from '../components/AddCategory';
import AllCategories from '../components/AllCategories';

function CategoryPage() {
  const storedToken = localStorage.getItem("authToken");
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleEdit = (category) => {
    console.log('Editing category:', category); 
    setEditingCategory(category);
  };

  const handleCategoryChange = (updatedCategories) => {
    setCategories(updatedCategories);
  };

  return (
    <div>
      Category Page
      <AddCategory 
        storedToken={storedToken} 
        editingCategory={editingCategory} 
        setEditingCategory={setEditingCategory} 
        categories={categories} 
        setCategories={handleCategoryChange} 
      />
      <AllCategories 
        storedToken={storedToken} 
        onEdit={handleEdit} 
        categories={categories} 
        setCategories={handleCategoryChange}
      />
    </div>
  );
}

export default CategoryPage;
