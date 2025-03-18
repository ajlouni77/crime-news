import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsTicker = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
        try {
          const response = await axios.get(
            "https://newsapi.org/v2/everything?q=tesla&from=2025-02-16&sortBy=publishedAt&apiKey=76850e9d2f054cb6b01870672b380ed0"
          );
      
          console.log("Total articles fetched:", response.data.articles.length);
      
          
          response.data.articles.forEach((article, idx) => {
            console.log(`News ${idx + 1}:`, article.title);
          });
      
          const crimeKeywords = [
            "crime", "murder", "robbery", "theft", "assault", "criminal", "kidnapping",
            "terrorism", "police", "arrested", "shooting", "homicide", "investigation",
            "fraud", "corruption", "law", "violence", "gang", "court", "judge", "prison", "victim"
          ];
      
          const filteredNews = response.data.articles
            .filter((article) => {
              if (!article.title || !article.description) return false;
      
              const title = article.title.toLowerCase();
              const description = article.description.toLowerCase();
      
              return crimeKeywords.some((keyword) => 
                title.includes(keyword) || description.includes(keyword)
              );
            })
            .slice(0, 10);
      
          console.log("Filtered News Count:", filteredNews.length);
          console.log("Filtered News Data:", filteredNews);
      
          setNews(filteredNews);
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };

    fetchNews();
    const interval = setInterval(fetchNews, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  text-white py-1 overflow-hidden relative">
      {news.length > 0 ? (
        <div className="marquee-container">
          <div className="marquee-content">
            {[...news, ...news].map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-item"
              >
                🚨 {article.title} 🚨
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-2">Loading news...</div>
      )}

      <style>
        {`
          .marquee-container {
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            position: relative;
            white-space: nowrap;
          }

          .marquee-content {
            display: flex;
            gap: 3rem;
            min-width: 200%;
            animation: marquee 20s linear infinite;
          }

          .news-item {
            flex: 0 0 auto;
            font-size: 1rem;
            color: white;
            text-decoration: none;
          }

          .news-item:hover {
            text-decoration: underline;
          }

          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default NewsTicker;

