import React, { useState, useEffect } from "react";

const ArticlePopup = ({ isOpen, onClose, article }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isPressing, setIsPressing] = useState(false);

  // إغلاق النافذة عند الضغط على Escape
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  const hasContent = (content) => {
    return content && content.trim() !== "";
  };

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div
        className={`bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden ${
          isPressing
            ? "shadow-[0_0_20px_rgba(59,130,246,0.7)]"
            : "shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        } transition-all duration-300 transform ${
          isPressing ? "scale-[0.99]" : "scale-100"
        }`}
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
        onMouseLeave={() => setIsPressing(false)}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#51a31d] to-[#3d8a0e] p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {article.title || "Article Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-black/10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
          {["Overview", "Content"].map((tab, index) => {
            const tabId = ["general", "content", "interaction"][index];
            const isActive = activeTab === tabId;

            return (
              <button
                key={tabId}
                className={`px-5 py-4 font-medium text-sm flex-1 transition-all duration-300 ${
                  isActive
                    ? "text-[#51a31d] border-b-2 border-[#51a31d] bg-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tabId)}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 bg-[#fafbfc]">
          {activeTab === "general" && (
            <div className="space-y-6 text-left">
              {[
                { label: "Author", value: article.author },
                {
                  label: "Date",
                  value: new Date(article.publishDate).toLocaleDateString(),
                },
                { label: "Category", value: article.categories },
                {
                  label: "Description",
                  value:
                    article.content.description ||
                    "No article description available",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 ltr bg-white rounded-lg shadow-sm border border-gray-100 hover:border-[#51a31d] transition-colors"
                >
                  <div className="flex ltr gap-2 items-center">
                    <span className="text-[#51a31d] font-bold">
                      {item.label}:
                    </span>
                    <span className="ltr  text-gray-700">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-6 text-left">
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[#51a31d] mb-4 border-l-4 border-[#51a31d] pl-3">
                  Content
                </h3>
                <div
                  className="article-container p-6 bg-white rounded-lg shadow-md space-y-6 ltr"
                  dir="ltr"
                >
                  <>
                    {/* Article Title */}
                    {hasContent(article.title) && (
                      <h2 className="text-2xl ltr font-bold text-gray-900">
                        {article.title}
                      </h2>
                    )}

                    {/* Article Description */}
                    {hasContent(article.content?.description) && (
                      <div className="text-gray-700 ltr leading-relaxed">
                        <p>{article.content.description}</p>
                      </div>
                    )}

                    {/* Victim Information Section */}
                    {hasContent(article.content?.victimInfo) && (
                      <div className="section-container bg-gray-50 p-4 rounded-md">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Victim Information
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {article.content.victimInfo}
                        </p>
                      </div>
                    )}

                    {/* Suspect Information Section */}
                    {hasContent(article.content?.suspectInfo) && (
                      <div className="section-container bg-gray-50 p-4 rounded-md">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Suspect Information
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {article.content.suspectInfo}
                        </p>
                      </div>
                    )}

                    {/* Weapons Used Section */}
                    {hasContent(article.content?.weaponsUsed) && (
                      <div className="section-container bg-gray-50 p-4 rounded-md">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Weapons Used
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {article.content.weaponsUsed}
                        </p>
                      </div>
                    )}

                    {/* Evidence Notes Section */}
                    {hasContent(article.content?.evidenceNotes) && (
                      <div className="section-container bg-gray-50 p-4 rounded-md">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Evidence Notes
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {article.content.evidenceNotes}
                        </p>
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePopup;
