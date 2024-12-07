import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const NoAccountPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true }); // Replace history state
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [navigate]);

  return (
    <div>
      <h2>No Registered Account Found</h2>
      <p>
  It seems like there is no registered account associated with this email. 
  Please <Link to="/register" replace>register here</Link> first.
</p>

    </div>
  );
};

export default NoAccountPage;
