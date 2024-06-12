import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import "../style/YearlyReportPage.css";

function YearlyExpenseGraph({monthlyData}) {
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    
      const filteredData = monthlyData.filter(item => item.totalAmount > 0);
      const labels = filteredData.map(item => months[item.month - 1]);
      const amounts = filteredData.map(item => item.totalAmount);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total Amount',
            data: amounts,
            backgroundColor: [
              'rgba(160, 160, 160, 0.7)',
              'rgba(240, 230, 220, 0.7)',
              'rgba(203, 195, 227, 0.7)',
              'rgba(218, 247, 166, 0.7)',
              'rgba(240, 230, 240, 0.7)',              
              'rgba(255,212,229, 0.7)',
              'rgba(255, 235, 205, 0.7)', 
              'rgba(255, 228, 196, 0.7)',
              'rgba(255, 255, 255, 0.7)',     
              'rgba(220, 210, 220, 0.7)', 
              'rgba(200, 160, 200, 0.7)', 
              'rgba(180, 150, 180, 0.7)'
            ],
            borderWidth: 1
          }
        ]
      };
  
    return (
      <div className='md:w-1/2 mt-5'> 
        <Pie data={chartData} />
      </div>
    );
}

export default YearlyExpenseGraph
