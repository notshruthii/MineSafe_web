import React, { useEffect, useState, useMemo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const indianWords = [
  "माइनसेफ", "மைன்சேஃப்", "ਮਾਈਨਸੇਫ਼", "మైన్సేఫ్", "ಮೈನ್ಸೇಫ್",
  "માઇનસેફ", "മൈന്സേഫ്", "ଓଡ଼ିଆ ମାଇନସେଫ୍", "MineSafe"
];

// Generate randomized styles for watermark words
const generateWordStyles = (count) => {
  const styles = [];
  const minDistance = 8;

  const isInCenter = (top, left) => top > 35 && top < 65 && left > 25 && left < 65;
  const isTooClose = (top, left) => {
    return styles.some((style) => {
      const existingTop = parseFloat(style.top);
      const existingLeft = parseFloat(style.left);
      const dTop = Math.abs(existingTop - top);
      const dLeft = Math.abs(existingLeft - left);
      return dTop < minDistance && dLeft < minDistance;
    });
  };

  let tries = 0;
  while (styles.length < count && tries < count * 20) {
    const top = Math.random() * 95;
    const left = Math.random() * 95;

    if (isInCenter(top, left) || isTooClose(top, left)) {
      tries++;
      continue;
    }

    const fontSize = Math.random() * (2.5 - 0.8) + 0.8;
    const rotate = Math.random() * 20 - 10;
    const opacity = (Math.random() * (0.07 - 0.02) + 0.05).toFixed(3);

    styles.push({
      top: `${top}vh`,
      left: `${left}vw`,
      fontSize: `${fontSize}rem`,
      transform: `rotate(${rotate}deg) scale(0.9)`,
      animationDelay: `${styles.length * 0.2}s`,
      opacity: opacity,
    });

    tries++;
  }

  return styles;
};

const ScatteredWords = ({ wordList, count }) => {
  const styles = useMemo(() => generateWordStyles(count), [count]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {styles.map((style, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            color: "white",
            filter: "blur(1px)",
            fontWeight: "bold",
            ...style,
            animation: "popIn 1s ease forwards",
          }}
        >
          {wordList[index % wordList.length]}
        </span>
      ))}
      <style>
        {`
          @keyframes popIn {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              transform: scale(0.9);
            }
          }
        `}
      </style>
    </div>
  );
};

const Test = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [pageReady, setPageReady] = useState(false);
  const [newsLoading, setNewsLoading] = useState(true);
  const api = import.meta.env.VITE_FIREBASE_API_KEY_NEWS;

  useEffect(() => {
    setPageReady(true);

    const fetchNews = async () => {
      try {
        const response = await fetch(
`https://newsapi.org/v2/everything?qInTitle=coal%20mine&language=en&sortBy=publishedAt&apiKey=${api}`        );
        const data = await response.json();
        if (data.status === "ok") {
          const titles = data.articles.map(article => article.title);
          setNewsItems(titles);
        } else {
          console.error("News API error:", data);
          setNewsItems(["Error fetching news"]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setNewsItems(["Unable to fetch news"]);
      }
      setNewsLoading(false);
    };

    fetchNews();
    const intervalId = setInterval(fetchNews, 200000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="min-vh-100 d-flex flex-column px-4 position-relative overflow-hidden"
      style={{
        background: `
          linear-gradient(to top right, rgba(68, 17, 236, 0.4), transparent 40%),
          linear-gradient(to top left, rgba(68, 17, 236, 0.4), transparent 40%),
          rgb(1, 8, 27)
        `,
        color: "white",
      }}
    >
      {/* Background watermark words */}
      <ScatteredWords wordList={indianWords} count={40} />

      {/* Main content */}
      <main
        className="d-flex justify-content-center align-items-center flex-grow-1 py-5"
        style={{ zIndex: 1 }}
      >
        <div
          className="text-center"
          style={{
            marginTop: "-10rem",
            maxWidth: "700px",
            opacity: pageReady ? 1 : 0,
            transform: pageReady ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.5s ease 1s, transform 1.5s ease 1s",
            background: "transparent",
          }}
        >
          <h1 className="display-5 fw-bold mb-3" style={{ fontSize: "39px" }}>
            Welcome to MineSafe -<br />Coal Mine Operations Portal
          </h1>
          <p className="lead mb-4">
            Manage your attendance, tasks, safety reports, and shift handovers — all in one place.
          </p>

          {/* Buttons */}
          <div
            className="d-flex justify-content-center gap-3 flex-wrap mb-4"
            style={{
              opacity: pageReady ? 1 : 0,
              transform: pageReady ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1.5s ease 1.3s, transform 1.5s ease 1.3s",
              background: "transparent",
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

          {/* News Ticker */}
          <section
            className="py-2 rounded"
            style={{
              background: "transparent",
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "0.9rem",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <h6 className="text-warning mb-1 text-start px-3">📢 What's New / Press Releases</h6>
            <div className="overflow-hidden px-3" style={{ whiteSpace: "nowrap" }}>
              {newsLoading ? (
                <span>Loading news...</span>
              ) : (
                <marquee behavior="scroll" direction="left" scrollamount="6">
                  {newsItems.map((item, index) => (
                    <span key={index} className="mx-4">
                      📢 {item}
                    </span>
                  ))}
                </marquee>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Test;
