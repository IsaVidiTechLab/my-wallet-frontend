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
    <div className='bg-midnight p-5 md:ml-60 h-svh pt-20 md:pt-10'>
    <>
      <h1 className=' font-semibold text-2xl text-white mb-4'>Expenses</h1>
    </>
    <div className='expense-info'>
      <AddExpense storedToken={storedToken} editingExpense={editingExpense} setEditingExpense={setEditingExpense} triggerRefresh={triggerRefresh}/>
      <AllExpenses storedToken={storedToken} onEdit={handleEdit} refreshKey={triggerRefresh}/>
    </div>
    </div>
  )
}

export default ExpensePage
