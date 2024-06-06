import React, { useState } from 'react'
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
    <div className='bg-midnight p-5 md:ml-60 h-screen pt-20 md:pt-10 overflow-auto'>
    <h1 className="font-semibold text-xl pb-3 text-white">Yearly Report</h1>
    <form onSubmit={handleSubmit} className="pb-5">
      <input
                type="number"
                name="year"
                value={year}
                onChange={(e)=>setYear(e.target.value)}
                placeholder="Amount"
                className="border border-gray-300 rounded-md p-2 w-48 mr-6"
                required
            />
      <button 
        className="bg-blue-500 rounded-lg py-2 px-4 text-white bg-lightblue hover:bg-white hover:text-darkgray"
        type='submit'>Submit</button>
    </form>

    <div className="year-table-container">
    <table className=" min-w-full rounded-md border border-gray mb-5 text-white">
    
      <thead>
        <th className="px-4 py-2 border-b-2 border-gray text-left">Month</th>
        <th className="px-4 py-2 border-b-2 border-gray text-left">Total Monthly Expense</th>
      </thead>
      <tbody>
      {mothlyData.map((data)=>{
        return (
          <tr key = {data.month} className="hover:bg-gray-50">
            <td 
              data-label="Month"
              className="px-4 py-2 border-b border-gray">{months[data.month-1]}</td>
            <td 
              data-label="Total Monthly Expense"
              className="px-4 py-2 border-b border-gray">{data.totalAmount}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
    
    </div>
    {mothlyData && <YearlyExpenseGraph monthlyData={ mothlyData}/>}
    
    </div>
    
  )
}

export default YearlyReportPage
