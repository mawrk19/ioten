// LandingPage.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const LandingPage = () => {
    const [temperature, setTemperature] = useState(null);
    const [status, setStatus] = useState('');
    const location = useLocation(); // To get scan data from the URL or scan result

    useEffect(() => {
        // Get the temperature from the URL query parameters (or passed state)
        const query = new URLSearchParams(location.search);
        const temp = parseFloat(query.get('temp'));
        setTemperature(temp);
        setStatus(temp >= 37.5 ? 'Fever Detected' : 'Normal');

        // Log the scan data
        logScan(temp);
    }, [location]);

    const logScan = async (temperature) => {
        try {
            await addDoc(collection(db, "scan_logs"), {
                temperature,
                timestamp: new Date(),
                status: temperature >= 37.5 ? "Fever Detected" : "Normal",
            });
        } catch (error) {
            console.error("Error logging scan: ", error);
        }
    };

    return (
        <div className="landing-page-container">
            <h1 className="title">Fever Scanner Result</h1>
            {temperature !== null ? (
                <div className="result-container">
                    <h2 className="temperature">Your Temperature: {temperature}°C</h2>
                    <h3 className={`status ${status === 'Fever Detected' ? 'fever' : 'normal'}`}>Status: {status}</h3>
                </div>
            ) : (
                <p className="no-result">No scan result available.</p>
            )}
        </div>
    );
};

export default LandingPage;
