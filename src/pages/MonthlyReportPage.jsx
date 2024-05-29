import React, { useState } from 'react';
import AllExpenses from '../components/AllExpenses';
import MonthlyExpenseGraph from '../components/MonthlyExpenseGraph';

function MonthlyReport() {
    const storedToken = localStorage.getItem("authToken");
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div>
            <h1>Monthly Report</h1>
            <AllExpenses storedToken={storedToken} refreshKey={refreshKey} onEdit={() => {}} />
            <MonthlyExpenseGraph storedToken={storedToken} refreshKey={refreshKey} />
        </div>
    );
}

export default MonthlyReport;
