import axios from 'axios';
import React, { useEffect, useState } from 'react'


function AllExpenses(props) {
    const API_URL = import.meta.env.VITE_API_URL

    const [expenses, setExpenses] = useState([])

    useEffect(()=>{
        const fetchExpenses = () => {
            axios
            .get(`${API_URL}/api/expenses`, { headers: { Authorization: `Bearer ${props.storedToken}`} })
            .then((response) => {
                setExpenses(response.data);
              console.log(response.data)
            })
            .catch((error) => {
              console.log(error);
            });

        }
        fetchExpenses();
    },[expenses])

  return (
    <div>
      <table>
        <th>Title</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Description</th>
        {
            expenses.map((expense)=>{
                return(
                    <tr>
                        <td>{expense.title}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.date}</td>
                        <td>{expense.description}</td>
                    </tr>
                )
            })
        }
       
      </table>
    </div>
  )
}

export default AllExpenses
