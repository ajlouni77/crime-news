import React, { useState, useEffect } from "react";

const CrimeNewsWarning = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("acceptedWarning");
    if (hasAccepted) {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedWarning", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-black text-white text-center max-w-lg p-8 rounded-lg shadow-lg border border-gray-700">
        {/* أيقونة التحذير */}
        <div className="flex justify-center mb-4">
          <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* عنوان التحذير */}
        <h2 className="text-xl font-bold mb-4">Content Warning</h2>

        {/* نص التحذير */}
        <p className="text-gray-300 mb-4">
          This website contains information about criminal activities, violence, and other sensitive topics
          that may not be suitable for all audiences. Viewer discretion is advised.
        </p>
        <p className="text-gray-300 mb-6">
          By continuing, you acknowledge that you are 18 years of age or older and are comfortable viewing
          potentially disturbing content.
        </p>

        {/* زر المتابعة */}
        <button
          onClick={handleAccept}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        >
          I Understand and Wish to Continue
        </button>
      </div>
    </div>
  );
};

export default CrimeNewsWarning;
