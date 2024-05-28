import React,{useState} from 'react'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses';

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
    <div>
      Expense Page
      <AddExpense storedToken={storedToken} editingExpense={editingExpense} setEditingExpense={setEditingExpense} triggerRefresh={triggerRefresh}/>
      <AllExpenses storedToken={storedToken} onEdit={handleEdit} refreshKey={triggerRefresh}/>
    </div>
  )
}

export default ExpensePage
