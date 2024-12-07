
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import './App.css';

const Admin = () => {
    const [staff, setStaff] = useState([]);
    const [newStaffEmail, setNewStaffEmail] = useState('');

    // Fetch staff data
    const fetchStaffData = () => {
        const staffCollection = collection(db, "users");
        const staffQuery = query(staffCollection, orderBy("email", "asc"));
        
        // Listen for real-time changes
        const unsubscribe = onSnapshot(staffQuery, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data());
            setStaff(data.filter(user => user.role === 'staff'));
        });

        // Cleanup the listener on component unmount
        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribe = fetchStaffData();
        
        // Cleanup listener on unmount
        return () => {
            unsubscribe();
        };
    }, []);

    // Add new staff
    const handleAddStaff = async () => {
        try {
            await addDoc(collection(db, "users"), {
                email: newStaffEmail,
                role: 'staff'
            });
            setNewStaffEmail('');
        } catch (error) {
            alert("Error adding staff: " + error.message);
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="add-staff">
                <input
                    type="email"
                    value={newStaffEmail}
                    onChange={(e) => setNewStaffEmail(e.target.value)}
                    placeholder="Enter staff email"
                />
                <button onClick={handleAddStaff}>Add Staff</button>
            </div>

            <div className="staff-list">
                <h2>Staff List</h2>
                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;