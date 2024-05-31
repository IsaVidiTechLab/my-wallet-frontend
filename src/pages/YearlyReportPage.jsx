import React, { useMemo, useState } from 'react'
import axios from 'axios';
import YearlyExpenseGraph from '../components/YearlyExpenseGraph';
import "../style/YearlyReportPage.css";

function YearlyReportPage() {


  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");
  const [year,setYear] = useState(new Date().getFullYear())
  const [mothlyData, setMonthlyData] = useState([]);
  const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      year : year
    }

    axios
      .post(`${API_URL}/api/expenses/yearlyReport`, requestBody, {headers: { Authorization: `Bearer ${storedToken}` }} )
      .then((response) => { 
        console.log('Yearly Report:', response.data);
        setMonthlyData(response.data)
      })
      .catch((error) => {
        console.log("Error while fetching Yearly Report",error)
      });

  }


  return (
    <div className='main-content'>
    <form onSubmit={handleSubmit}>
      <input
                type="number"
                name="year"
                value={year}
                onChange={(e)=>setYear(e.target.value)}
                placeholder="Amount"
                required
            />
      <button type='submit'>Submit</button>
    </form>

    <table>
    <tbody>
      <tr>
        <th style={{ padding: "10px" }}>Month</th>
        <th style={{ padding: "10px" }}>Total Monthly Expense</th>
      </tr>
      
      {mothlyData.map((data)=>{
        return (
          <tr key = {data.month}>
            <td>{months[data.month-1]}</td>
            <td>{data.totalAmount}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
    {mothlyData && <YearlyExpenseGraph monthlyData={ mothlyData}/>}
    
    </div>
    
  )
}

export default YearlyReportPage
