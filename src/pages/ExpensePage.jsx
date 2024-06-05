import React,{useState} from 'react'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses';
import "../style/ExpensePage.css";

function ExpensePage() {

    const storedToken = localStorage.getItem("authToken");
    const [editingExpense, setEditingExpense] = useState(null);

    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };
    
    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

  return (
    <div className='main-content bg-white flex flex-col gap-4'>
    <>
      <h1 className=' font-semibold text-xl'>Expenses</h1>
    </>
    <div className='flex flex-row gap-4'>
      <AddExpense storedToken={storedToken} editingExpense={editingExpense} setEditingExpense={setEditingExpense} triggerRefresh={triggerRefresh}/>
      <AllExpenses storedToken={storedToken} onEdit={handleEdit} refreshKey={triggerRefresh}/>
    </div>
    </div>
  )
}

export default ExpensePage
