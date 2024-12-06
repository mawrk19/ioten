import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Ensure 'db' is correctly exported from '../firebase'
import './App.css'; // Include the CSS for styling

const Dashboard = () => {
    const [tempData, setTempData] = useState([]);
    const [latestTemp, setLatestTemp] = useState(null);
    const [scanLogs, setScanLogs] = useState([]);

    // Fetch temperature data for the chart
    const fetchTemperatureData = () => {
        const tempCollection = collection(db, "temperatures");
        const tempQuery = query(tempCollection, orderBy("timestamp", "desc"));
        
        // Listen for real-time changes
        const unsubscribe = onSnapshot(tempQuery, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data());
            setTempData(data);
            if (data.length > 0) {
                setLatestTemp(data[0].temperature); // Set the latest temperature
            }
        });

        // Cleanup the listener on component unmount
        return unsubscribe;
    };

    // Fetch scan logs (for the admin dashboard)
    const fetchScanLogs = () => {
        const logsCollection = collection(db, "scan_logs");
        const logsQuery = query(logsCollection, orderBy("timestamp", "desc"));
        
        // Listen for real-time scan logs
        const unsubscribe = onSnapshot(logsQuery, (snapshot) => {
            const logs = snapshot.docs.map(doc => doc.data());
            setScanLogs(logs);
        });

        // Cleanup the listener on component unmount
        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribeTemp = fetchTemperatureData();
        const unsubscribeLogs = fetchScanLogs();
        
        // Cleanup listeners on unmount
        return () => {
            unsubscribeTemp();
            unsubscribeLogs();
        };
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Fever Scanner Dashboard</h1>

            <div className="temperature-display">
                <h2 className="latest-temp">Latest Temperature: <span>{latestTemp}°C</span></h2>
            </div>
            
            <div className="chart-container">
                <Chart
                    options={{
                        chart: { type: 'line', toolbar: { show: false } },
                        xaxis: { categories: tempData.map(item => new Date(item.timestamp).toLocaleString()) },
                        tooltip: { enabled: true, shared: true, followCursor: true },
                        grid: { show: true, borderColor: '#e7e7e7', strokeDashArray: 5 },
                        yaxis: {
                            title: { text: 'Temperature (°C)', style: { fontSize: '14px', fontWeight: 'bold' } }
                        }
                    }}
                    series={[{ name: 'Temperature', data: tempData.map(item => item.temperature) }]}
                    height={350}
                />
            </div>

            <div className="scan-logs">
                <h2>Scan Logs</h2>
                <ul>
                    {scanLogs.map((log, index) => (
                        <li key={index}>
                            <p>{new Date(log.timestamp.toDate()).toLocaleString()} - Temp: {log.temperature}°C - Status: {log.status}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
