import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
// Uncomment if you want to use Card components and have them installed
// import { Card, CardContent } from "@/components/ui/card";

export default function CoalMineUpdates() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use environment variable if available, else fallback to your placeholder key
  const api = import.meta.env.VITE_FIREBASE_API_KEY_NEWS || "YOUR_API_KEY";
  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=coal%20mine%20AND%20India&language=en&sortBy=publishedAt&apiKey=${api}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();
        setNews(data.articles.slice(0, 5));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="text-white min-h-screen p-6" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Page Heading */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Coal Mine News Portal</h1>
        <p className="text-gray-400">Latest mining updates from Jharkhand</p>
      </header>

      {/* News Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
          📰 Recent Updates – Jharkhand
        </h2>

        {loading ? (
          <div className="text-center">
            <Loader2 className="animate-spin inline mr-2 text-white" />
            Loading latest local news...
          </div>
        ) : (
          <div className="grid gap-4">
            {news.map((article, index) => (
              // You can switch to Card components if you want by uncommenting imports and replacing this div
              <div
                key={index}
                className="bg-black border border-white hover:border-gray-500 p-4 rounded-lg shadow-md transition-all"
              >
                <h3 className="text-lg font-bold mb-1">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-400">{article.description}</p>
                <p className="text-xs text-right text-gray-500 mt-2">
                  Source: {article.source.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
