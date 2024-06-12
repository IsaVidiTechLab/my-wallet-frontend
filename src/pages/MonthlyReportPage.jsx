import React, { useState, useEffect } from "react";
import axios from "axios";
import MonthlyExpenseGraph from "../components/MonthlyExpenseGraph";
import "../style/MonthlyReportPage.css";
function MonthlyReportPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [monthlyData, setMonthlyData] = useState([]);
  const fetchMonthlyExpenses = (selectedMonth) => {
    const [year, monthIndex] = selectedMonth.split("-");
    const requestBody = {
      year: parseInt(year),
      month: parseInt(monthIndex),
    };
    axios
      .post(`${API_URL}/api/expenses/monthlyReport`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Monthly Report:", response.data);
        if (response.data && Array.isArray(response.data.expenses)) {
          setMonthlyData(response.data.expenses);
        } else {
          setMonthlyData([]);
          console.error("Unexpected response data format:", response.data);
        }
      })
      .catch((error) => {
        console.log("Error while fetching Monthly Report", error);
        setMonthlyData([]);
      });
  };
  useEffect(() => {
    fetchMonthlyExpenses(month);
  }, [month]);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMonthlyExpenses(month);
  };
  return (
    <div className="bg-midnight p-5 md:ml-60 pt-20 md:pt-10  ">
      <h1 className="font-semibold text-xl pb-3 text-white">Monthly Report</h1>
      <form onSubmit={handleSubmit} className="pb-5">
        <input
          type="month"
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-48 mr-6"
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-lg py-2 px-4 text-white bg-lightblue hover:bg-white hover:text-darkgray"
        >
          Submit
        </button>
      </form>

      <div className="report-container">
        <div className="table-container">
          <table className="min-w-full rounded-md border border-gray mb-5 text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray text-left">Title</th>
                <th className="px-4 py-2 border-b-2 border-gray text-left">Amount</th>
                <th className="px-4 py-2 border-b-2 border-gray text-left">Date</th>
                <th className="px-4 py-2 border-b-2 border-gray bg-gray-100 text-left leading-4 text-white">Description</th>
                <th className="px-4 py-2 border-b-2 border-gray bg-gray-100 text-left leading-4 text-white">Category</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data) => (
                <tr key={data._id} className="hover:bg-gray-50">
                  <td data-label="Title" className="px-4 py-2 border-b border-gray">{data.title}</td>
                  <td data-label="Amount" className="px-4 py-2 border-b border-gray">{data.amount}</td>
                  <td data-label="Date" className="px-4 py-2 border-b border-gray">{new Date(data.date).toLocaleDateString()}</td>
                  <td data-label="Description" className="px-4 py-2 border-b border-gray">{data.description}</td>
                  <td data-label="Category" className="px-4 py-2 border-b border-gray">{data.categoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
        <MonthlyExpenseGraph storedToken={storedToken} month={month} />
        </div>
        
      </div>
    </div>
  );
}
export default MonthlyReportPage;