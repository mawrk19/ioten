import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./App.css";

const Dashboard = () => {
  const [tempData, setTempData] = useState([]);
  const [latestTemp, setLatestTemp] = useState(null);
  const [scanLogs, setScanLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempCollection = collection(db, "temperatures");
    const tempQuery = query(tempCollection, orderBy("timestamp", "desc"));

    const unsubscribeTemp = onSnapshot(tempQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setTempData(data);
      if (data.length > 0) {
        setLatestTemp(data[0].temperature);
      }
    });

    const logsCollection = collection(db, "scan_logs");
    const logsQuery = query(logsCollection, orderBy("timestamp", "desc"));

    const unsubscribeLogs = onSnapshot(logsQuery, (snapshot) => {
      const logs = snapshot.docs.map((doc) => doc.data());
      setScanLogs(logs);
    });

    return () => {
      unsubscribeTemp();
      unsubscribeLogs();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Fever Scanner Dashboard</h1>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="temperature-display">
        <h2 className="latest-temp">
          Latest Temperature: <span>{latestTemp ? `${latestTemp}°C` : "N/A"}</span>
        </h2>
      </div>

      <div className="chart-container">
        <Chart
          options={{
            chart: { type: "line", toolbar: { show: false } },
            xaxis: { categories: tempData.map((item) => new Date(item.timestamp).toLocaleString()) },
            tooltip: { enabled: true, shared: true, followCursor: true },
            grid: { show: true, borderColor: "#e7e7e7", strokeDashArray: 5 },
            yaxis: {
              title: { text: "Temperature (°C)", style: { fontSize: "14px", fontWeight: "bold" } },
            },
          }}
          series={[{ name: "Temperature", data: tempData.map((item) => item.temperature) }]}
          height={350}
        />
      </div>

      <div className="scan-logs">
        <h2>Scan Logs</h2>
        <table className="scan-logs-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Temperature (°C)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {scanLogs.length > 0 ? (
              scanLogs.map((log, index) => (
                <tr key={index}>
                  <td>{new Date(log.timestamp.toDate()).toLocaleString()}</td>
                  <td>{log.temperature}°C</td>
                  <td>{log.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No logs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
