import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className="min-vh-100 d-flex flex-column px-4"
      style={{
        backgroundColor: "#1A1A1A", // Olive Green
        color: "white",           // Bone text
      }}
    >
      <main className="d-flex justify-content-between align-items-center flex-grow-1 py-5">

        {/* Left: Welcome section */}
        <div
          className="w-50"
          style={{
            marginLeft: "1.5rem",
            marginTop: "-7rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(-30px)",
            transition: "opacity 1.5s ease 1s, transform 1.5s ease 1s",
          }}
        >
          <h1 className="display-5 fw-bold mb-3">
            Welcome to MineSafe -<br />Coal Mine Operations Portal
          </h1>
          <p className="lead mb-4" style={{ color: "white" }}>
            Manage your attendance, tasks, safety reports, and shift handovers — all in one place.
          </p>

          <div
            className="d-flex gap-3 flex-wrap"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1.5s ease 1.3s, transform 1.5s ease 1.3s",
            }}
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 fw-semibold rounded-pill"
              style={{
                backgroundColor: "#FFFFFF",  
                color: "#1A1A1A",            
                border: "2px solid #1A1A1A"
              }}
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate('/safety-guidelines')}
              className="px-4 py-2 fw-semibold rounded-pill"
              style={{
                backgroundColor: "#FFFFFF",  
                color: "#1A1A1A",            
                border: "2px solid #1A1A1A"
              }}
            >
              Safety Guidelines
            </button>
          </div>
        </div>

        {/* Right: Quick stats & alerts box */}
        <div
          style={{
            marginRight: "7rem",
            marginTop: "-4rem",
            width: "330px",
            minHeight: "350px",
            border: "2px solid white",
            borderRadius: "12px",
            boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.2)",
            color: "white",  // Bone text
            padding: "20px",
            fontWeight: "600",
            fontSize: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "left",
            backgroundColor: "rgba(255, 255, 255, 0.05)",  // subtle translucent box
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ fontSize: "1.3rem", fontWeight: "650", marginBottom: "18px" }}>
            QUICK STATS
          </div>
          <div>Today's Shifts: <span style={{ fontWeight: '900' }}>3</span></div>
          <div>Pending Reports: <span style={{ fontWeight: '900' }}>2</span></div>
          <div style={{ marginBottom: "10px" }}>Logged Workers: <span style={{ fontWeight: '900' }}>87</span></div>

          <div style={{ fontSize: "1.3rem", fontWeight: "700", marginTop: "15px", marginBottom: "13px" }}>
            ALERTS
          </div>
          <div style={{ color: "#ff6b6b", fontWeight: "470", paddingBottom: "2px" }}>⚠️ Mine crash reported in Zone A</div>
          <div style={{ color: "#f0ad4e", fontWeight: "470", paddingBottom: "2px" }}>⚠️ Equipment malfunction in Shaft 3</div>
          <div style={{ color: "#ff6b6b", fontWeight: "470", paddingBottom: "2px" }}>⚠️ Gas leak detected in Tunnel</div>
          <div style={{ color: "#ff6b6b", fontWeight: "470", paddingBottom: "2px" }}>⚠️ Safety drill scheduled for 3 PM</div>
        </div>
      </main>
    </div>
  );
};

export default Test;




