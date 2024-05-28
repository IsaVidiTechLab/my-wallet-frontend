import React,{useState} from 'react'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses';

function ExpensePage() {

    const storedToken = localStorage.getItem("authToken");
    const [editingExpense, setEditingExpense] = useState(null);
    
    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

  return (
    <div>
      Expense Page
      <AddExpense storedToken={storedToken} editingExpense={editingExpense} setEditingExpense={setEditingExpense}/>
      <AllExpenses storedToken={storedToken} onEdit={handleEdit}/>
    </div>
  )
}

export default ExpensePage
