import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const newsItems = [
    "Press Release: Ministry announces new safety reforms.",
    "What's New: Digitization of coal logistics launched.",
    "Update: Coal production increased by 7% in Q1.",
    "Event: National Coal Safety Week to begin July 1st.",
    "Notice: Coal auction process streamlined under new portal."
  ];

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
      {/* Hero Section */}
      <main className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
        <div
          className="text-center"
          style={{
            marginTop: "-10rem",
            maxWidth: "700px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.5s ease 1s, transform 1.5s ease 1s",
          }}
        >
          <h1 className="display-5 fw-bold mb-3" style={{ fontSize: "39px" }}>
            Welcome to MineSafe -<br />Coal Mine Operations Portal
          </h1>
          <p className="lead mb-4">
            Manage your attendance, tasks, safety reports, and shift handovers — all in one place.
          </p>

          <div
            className="d-flex justify-content-center gap-3 flex-wrap"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1.5s ease 1.3s, transform 1.5s ease 1.3s",
            }}
          >
            <button
              onClick={() => navigate('/login')}
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
      </main>

      {/* News Ticker Section */}
      <section className="py-3" style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}>
        <h5 className="text-center text-warning mb-2">What's New / Press Releases</h5>
        <div className="overflow-hidden" style={{ whiteSpace: "nowrap" }}>
          <marquee behavior="scroll" direction="left" scrollamount="6">
            {newsItems.map((item, index) => (
              <span key={index} className="mx-4">
                📢 {item}
              </span>
            ))}
          </marquee>
        </div>
      </section>
    </div>
  );
};

export default Test;
