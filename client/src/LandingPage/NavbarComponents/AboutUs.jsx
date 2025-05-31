import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className="min-vh-100 d-flex flex-column px-4"
      style={{
        background: `
          linear-gradient(to top right, rgba(68, 17, 236, 0.7), transparent 40%),
          linear-gradient(to top left, rgba(68, 17, 236, 0.7), transparent 40%),
          rgb(1, 8, 27)
        `,
        color: "white",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <main className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
        <div
          className="container text-center"
          style={{
            marginTop:"-200px",
            maxWidth: "800px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.5s ease 1s, transform 1.5s ease 1s",
            padding: "2rem",
          }}
        >
          <h1 className="display-5 fw-bold mb-4" style={{ fontSize: "38px" }}>
            About Us
          </h1>
          <p className="lead mb-3" style={{ fontSize: "17px", color: "#d0d0d0" }}>
            Welcome to <strong>MineSafe</strong> — your trusted portal for coal mining operations management.
          </p>
          <p style={{ fontSize: "16px", color: "#cccccc" }}>
            Our mission aligns with the Ministry of Coal's dedication to sustainable and responsible coal mining in India. MineSafe
            is designed to streamline attendance, task management, safety reporting, and shift handovers to improve productivity
            and ensure the safety of mining personnel.
          </p>
          <p style={{ fontSize: "16px", color: "#cccccc" }}>
            We are committed to leveraging technology to support the coal mining sector's growth while prioritizing environmental
            care and worker welfare.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
