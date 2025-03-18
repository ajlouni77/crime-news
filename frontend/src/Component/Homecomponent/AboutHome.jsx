import React, { useState, useEffect } from "react";
import heroVideo from "../assets/hero.mp4"; // Adjust path as needed
import hero from "../../assets/Recording 2025-03-12 205117.mp4"; // تأكد أن اسم الملف صحيح

const AboutHome = ({ title, description, stats }) => {
  // ✅ تتبع عدد الزيارات باستخدام localStorage
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const storedVisitCount = localStorage.getItem("visitCount");

    if (storedVisitCount) {
      const newVisitCount = parseInt(storedVisitCount, 10) + 1;
      setVisitCount(newVisitCount);
      localStorage.setItem("visitCount", newVisitCount);
    } else {
      setVisitCount(1);
      localStorage.setItem("visitCount", 1);
    }
  }, []);

  // ✅ التأكد من أن `stats` يحتوي على `articlesCount`
  const articlesCount = stats.find((stat) => stat.label === "Investigations Covered")?.value || 0;

  // ✅ تحديث بيانات الإحصائيات
  const statsData = [
    { value: "New", label: "Experience" },
    { value: visitCount, label: "Global Correspondents" },
    { value: articlesCount, label: "Investigations Covered" },
    { value: "24/7", label: "News Coverage" },
  ];

  return (
    <div className="relative bg-[rgba(0,0,0,0.8)] text-[var(--text-color)] p-6">
    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
    <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-"
      >
        <source src={hero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
   </div>
    <div className="max-w-6xl mx-auto relative z-10">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-[var(--primary-color)] pb-1 inline-block">About CRIMEGAZETTE</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <p className="mb-4 text-sm">
            Crime News Network is dedicated to providing in-depth coverage of criminal 
            activities, investigations, and justice system proceedings worldwide. Our 
            mission is to inform the public about important crime-related issues while 
            maintaining the highest standards of journalistic integrity.
          </p>
          
          <p className="mb-4 text-sm">
            Our team of experienced journalists and crime analysts work tirelessly to bring 
            you accurate, timely, and comprehensive reporting on criminal cases that 
            impact our society. We believe in responsible journalism that respects the legal 
            process while keeping the public informed.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded">
                <p className="text-[var(--primary-color)] text-3xl font-bold text-center">{stat.value}</p>
                <p className="text-gray-400 text-xs text-center">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-4 w-full h-64 flex items-center justify-center">
            <video className="w-full h-full rounded-lg object-cover" controls>
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AboutHome;
