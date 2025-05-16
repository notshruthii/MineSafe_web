import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DiBlackberry } from "react-icons/di";
import { color } from "three/tsl";
import { RGBADepthPacking } from "three";
import { rgbShift } from "three/examples/jsm/tsl/display/RGBShiftNode.js";

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="text-light min-vh-100 d-flex flex-column px-4" style={{backgroundColor:"#1A1A1A"}}>
        <main className="d-flex justify-content-between align-items-center flex-grow-1 py-5">
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
              Welcome to MineSafe -<br/>Coal Mine Operations Portal
            </h1>
             <p className="lead text-secondary mb-4">
                Manage your attendance, tasks, safety reports, and shift handovers — all in one place.
            </p>
            <div
              className="d-flex gap-3"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1.5s ease 1.3s, transform 1.5s ease 1.3s",
              }}
            >
              <button className="btn btn-light px-4 py-2 fw-semibold rounded-pill">Go to Dashbaord</button>
              <button className="btn btn-outline-light px-4 py-2 fw-semibold rounded-pill">Safety Guidelines</button>
            </div>
          </div>
<div
  style={{
    marginRight: "7rem",
    marginTop: "-4rem",
    width: "330px",
    minHeight: "300px",
    border: "2px solid rgba(255, 255, 255, 0.73)",
    borderRadius: "12px",
    boxShadow: "0 0 10px 1px rgba(255, 255, 255, 3)",
    color: "white",
    padding: "20px",
    fontWeight: "600",
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
    backgroundColor: "transparent",
  }}
>
  <div style={{ fontSize: "1.3rem", fontWeight: "650", marginBottom: "18px", }}>
    QUICK STATS
  </div >
  <div style={{ marginTop: "0" }}>Today's Shifts: <span style={{ fontWeight: '900' }}>3</span></div>
  <div>Pending Reports: <span style={{ fontWeight: '900' }}>2</span></div>
  <div style={{marginBottom: "10px"}}>Logged Workers: <span style={{ fontWeight: '900'  }}>87</span></div>

  <div style={{ fontSize: "1.3rem", fontWeight: "700", marginTop: "15px", marginBottom: "13px" }}>
    ALERTS
  </div>
  <div style={{ color: "#ff6b6b", fontWeight: "470",paddingBottom:"2px"}}>⚠️ Mine crash reported in Zone A</div>
  <div style={{ color: "#f0ad4e", fontWeight: "470",paddingBottom:"2px" }}>⚠️ Equipment malfunction in Shaft 3</div>
  <div style={{ color: "#ff6b6b", fontWeight: "470",paddingBottom:"2px" }}>⚠️ Gas leak detected in Tunnel</div>
  <div style={{ color: "#ff6b6b", fontWeight: "470",paddingBottom:"2px" }}>⚠️Safety drill scheduled for 3 PM</div>
</div>


        </main>
      </div>
    
  );
}
  