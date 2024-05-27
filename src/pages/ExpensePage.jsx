import React from 'react'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses';

function ExpensePage() {

    const storedToken = localStorage.getItem("authToken");
    

  return (
    <div>
      Expense Page
      <AddExpense storedToken={storedToken}/>
      <AllExpenses storedToken={storedToken}/>
    </div>
  )
}

export default ExpensePage
