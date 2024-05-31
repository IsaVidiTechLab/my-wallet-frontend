import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

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
              '#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB',
              '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56', '#FF6384',
              '#36A2EB', '#FFCE56'
            ]
          }
        ]
      };
  
    return (
      <div className='w-64 h-64'>
        
        <Pie data={chartData} />
      </div>
    );
}

export default YearlyExpenseGraph
