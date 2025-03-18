import { useState } from "react";
import { Trash2 } from "lucide-react";

const BookmarkPage = () => {
  
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: "Crime Report: Robbery in Downtown", category: "Crime" },
    {
      id: 2,
      title: "Breaking: New Evidence in Murder Case",
      category: "Investigation",
    },
    { id: 3, title: "Police Arrest Suspect in Fraud Scheme", category: "Law" },
  ]);

  
  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((article) => article.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center border-b border-red-900 pb-4">
          Saved Articles
        </h2>

        {bookmarks.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">No bookmarks yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookmarks.map((article) => (
              <div
                key={article.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border-l-4 border-red-800"
              >
                <div className="p-6 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center">
                      <span className="inline-block bg-red-900 text-white text-xs px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeBookmark(article.id)}
                    className="p-2 bg-red-900 text-white rounded-full hover:bg-red-800 transition-colors"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
