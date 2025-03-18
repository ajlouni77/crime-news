import React, { useState, useEffect } from 'react';
import { Search, FileText, UserX, AlertTriangle, Shield } from 'lucide-react';

const Statistics = () => {

  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    // بدء الأنيميشن
    setAnimate(true);

    // استدعاء بيانات الإحصائيات من API عالمي
    // استبدل الرابط التالي برابط الـ API الخاص بك
    fetch("https://zylalabs.com/api/6011/crime+data+by+zip+api/8066/crime+by+zip")
      .then((res) => res.json())
      .then((data) => {
        // يفترض أن الـ API يعيد مصفوفة من الكائنات بالإحصائيات
        setStats(data);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });
  }, []);

  const defaultStats = [
    { id: 1, title: "Homicides", number: 7.6, change: "Per 100K people globally", icon: <UserX size={20} /> },
    { id: 2, title: "Missing Persons", number: 600000, change: "Reported annually in the US", icon: <AlertTriangle size={20} /> },
    { id: 3, title: "Cold Cases", number: 250000, change: "Unsolved homicide cases in the US since 1980", icon: <FileText size={20} /> },
    { id: 4, title: "Active Investigations", number: 1200000, change: "Ongoing criminal cases in the US (2022)", icon: <Shield size={20} /> }
  ];
  

  const displayedStats = stats.length > 0 ? stats : defaultStats;




// ======================================secrion 2================
const [animate, setAnimate] = useState(true); 
const [selectedInvestigation, setSelectedInvestigation] = useState(null);

// بيانات التحقيقات (يمكنك تحديثها ببيانات حقيقية)
const investigations = [
  { 
    id: 1,
    date: "March 11, 2025", 
    title: "Mysterious Disappearance in Downtown Area", 
    desc: "Third person missing from same neighborhood in two weeks. Police suspect connection.",
    status: "ACTIVE",
    details: "Detailed investigation info: The case involves multiple missing persons in the downtown area, with potential links to organized criminal activity. Investigators are gathering witness statements and forensic evidence, and following up on new leads from local residents. For additional images and an in-depth analysis, please read the full report on our website."
  },
  { 
    id: 2,
    date: "March 9, 2025", 
    title: "Evidence Found in River Heights Case", 
    desc: "New forensic evidence uncovered in 2-year-old cold case. Lead detective optimistic.",
    status: "REOPENED",
    details: "In-depth details: New forensic techniques have uncovered DNA evidence linking previous unsolved incidents, sparking renewed investigations and promising leads. Authorities are re-examining old case files and witness testimonies. If you're interested in more images and a complete breakdown of the forensic findings, please check out the full report."
  },
  { 
    id: 3,
    date: "March 7, 2025", 
    title: "High-Profile Art Heist Investigation", 
    desc: "$2.3M worth of paintings stolen from private collection. Security footage being analyzed.",
    status: "CLASSIFIED",
    details: "Exclusive details: The art heist, involving high-security systems and multiple suspects, is under tight investigation. Experts are scrutinizing security footage and tracking suspicious transactions. Authorities have also released some exclusive images and a detailed timeline of events. For more visuals and comprehensive details on the investigation, please refer to the full report."
  }
];


const handleCardClick = (investigation) => {
  setSelectedInvestigation(investigation);
};

const closeModal = () => {
  setSelectedInvestigation(null);
};
// ======================================secrion 2================

  return (
    <div className="bg-[var(--text-color)] text-[var(--background-color)] font-sans relative overflow-hidden min-h-screen w-full">
   {/* Crime Scene Tape */}
<div className="absolute top-5 left-0 w-full overflow-hidden h-8 z-10 transform -rotate-2">
  <div className="flex animate-marquee">
    <span className="bg-yellow-400 text-black font-bold text-lg py-1 px-4 whitespace-nowrap">
      CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS
    </span>
    <span className="bg-yellow-400 text-black font-bold text-lg py-1 px-4 whitespace-nowrap">
      CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS
    </span>
  </div>
</div>

<div className="absolute bottom-5 left-0 w-full overflow-hidden h-8 z-10 transform rotate-2">
  <div className="flex animate-marquee-reverse">
    <span className="bg-yellow-400 text-black font-bold text-lg py-1 px-4 whitespace-nowrap">
      CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS
    </span>
    <span className="bg-yellow-400 text-black font-bold text-lg py-1 px-4 whitespace-nowrap">
      CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS CRIME SCENE DO NOT CROSS
    </span>
  </div>
</div>
      
      {/* Blood Splatters & Fingerprints */}
      <div className="absolute top-20 left-20 w-24 h-24 rounded-full bg-[var(--primary-color)] opacity-20 transform rotate-12 scale-150 blur-sm"></div>
      <div className="absolute bottom-40 right-32 w-20 h-20 rounded-full bg-[var(--primary-color)] opacity-30 blur-sm"></div>
      
      {/* Handprint */}
      <div className="absolute top-1/4 right-10 w-20 h-24 opacity-30">
        <svg viewBox="0 0 100 120" className="fill-[var(--primary-color)]">
          <path d="M20,20 C25,5 35,0 40,0 C45,0 50,5 50,15 L50,80 L30,80 L30,30 C30,25 25,15 20,20 Z" />
          <path d="M55,15 C55,5 60,0 65,0 C70,0 75,5 80,20 C80,25 75,30 75,30 L75,80 L55,80 L55,15 Z" />
          <path d="M0,30 C0,20 5,15 10,15 C15,15 20,20 20,30 L20,80 L0,80 L0,30 Z" />
          <path d="M85,30 C85,20 90,15 95,15 C100,15 105,20 105,30 L105,80 L85,80 L85,30 Z" />
          <rect x="0" y="80" width="105" height="30" rx="10" />
        </svg>
      </div>
      
      {/* Fingerprints */}
      <div className="absolute top-1/3 left-10 w-16 h-16 opacity-0">
        <svg viewBox="0 0 100 100" className="fill-[var(--text-color)]">
          <path d="M50,0 C30,0 15,15 15,35 C15,45 20,55 25,60 C30,65 35,75 35,85 C35,95 30,100 25,105 H35 C40,100 45,90 45,85 C45,75 40,65 35,60 C30,55 25,45 25,35 C25,20 35,10 50,10 C65,10 75,20 75,35 C75,45 70,55 65,60 C60,65 55,75 55,85 C55,95 60,100 65,105 H75 C70,100 65,90 65,85 C65,75 70,65 75,60 C80,55 85,45 85,35 C85,15 70,0 50,0z" />
          <path d="M50,20 C40,20 35,25 35,35 C35,45 40,55 45,60 C50,65 55,75 55,85 H65 C65,75 60,65 55,60 C50,55 45,45 45,35 C45,30 47,30 50,30 C53,30 55,30 55,35 C55,45 50,55 45,60 C40,65 35,75 35,85 H45 C45,75 50,65 55,60 C60,55 65,45 65,35 C65,25 60,20 50,20z" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-10 w-16 h-16 opacity-10 transform rotate-45">
        <svg viewBox="0 0 100 100" className="fill-[var(--text-color)]">
          <path d="M50,0 C30,0 15,15 15,35 C15,45 20,55 25,60 C30,65 35,75 35,85 C35,95 30,100 25,105 H35 C40,100 45,90 45,85 C45,75 40,65 35,60 C30,55 25,45 25,35 C25,20 35,10 50,10 C65,10 75,20 75,35 C75,45 70,55 65,60 C60,65 55,75 55,85 C55,95 60,100 65,105 H75 C70,100 65,90 65,85 C65,75 70,65 75,60 C80,55 85,45 85,35 C85,15 70,0 50,0z" />
          <path d="M50,20 C40,20 35,25 35,35 C35,45 40,55 45,60 C50,65 55,75 55,85 H65 C65,75 60,65 55,60 C50,55 45,45 45,35 C45,30 47,30 50,30 C53,30 55,30 55,35 C55,45 50,55 45,60 C40,65 35,75 35,85 H45 C45,75 50,65 55,60 C60,55 65,45 65,35 C65,25 60,20 50,20z" />
        </svg>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto py-24 px-6 relative z-10">
        <div className={`border-b-2 border-[var(--primary-color)] pb-4 mb-10 relative ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'} transition-all duration-1000`}>
          <h1 className="text-4xl font-bold tracking-wider uppercase">
            Crime <span className="text-[var(--primary-color)]">Statistics</span>
          </h1>
          <div className="absolute right-4 top-2 text-[var(--primary-color)]">
            <Search size={28} />
          </div>
        </div>
        





        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {displayedStats.map((stat, index) => (
        <div 
          key={stat.id} 
          className={`bg-gray-100 border-l-4 border-[var(--primary-color)] p-6 relative shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-300 ${
            animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
            {stat.id}
          </div>
          <h3 className="text-lg uppercase font-semibold mb-1 flex items-center">
            <span className="mr-2 text-[var(--primary-color)]">{stat.icon}</span>
            {stat.title}
          </h3>
          <div className="text-5xl font-bold text-[var(--primary-color)] my-3 text-shadow">
            {stat.number}
          </div>
          <p className="text-gray-600 text-sm">{stat.change}</p>
        </div>
      ))}
    </div>




        {/* Wanted Section with Case Files */}
        <div className={`mt-16 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all duration-1000 delay-500`}>
      <div className="border-b-2 border-[var(--primary-color)] pb-4 mb-10 relative">
        <h1 className="text-4xl font-bold tracking-wider uppercase flex items-center">
          <div className="bg-[var(--primary-color)] text-white px-4 py-1 mr-4 transform rotate-6 inline-block">WANTED</div>
          Latest <span className="text-[var(--primary-color)] ml-2">Investigations</span>
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {investigations.map((caseFile, index) => (
          <div 
            key={caseFile.id} 
            className="bg-gray-100 p-6 border border-gray-300 relative hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
            style={{ transitionDelay: `${index * 150 + 700}ms` }}
            onClick={() => handleCardClick(caseFile)}
          >
            <div className="absolute top-4 right-4 bg-[var(--primary-color)] text-white px-2 py-1 text-xs transform rotate-6 font-bold">
              TOP SECRET
            </div>
            <div className="text-gray-600 text-sm mb-2">{caseFile.date}</div>
            <div className="text-xl font-medium mb-3">{caseFile.title}</div>
            <p className="text-gray-600 mb-4">{caseFile.desc}</p>
            <div className="inline-block bg-[var(--primary-color)] text-white px-3 py-1 text-sm">
              {caseFile.status}
            </div>
          </div>
        ))}
      </div>

 {/* Modal Popup */}
{selectedInvestigation && (
  <div 
    className=" inset-0 flex  justify-center bg-blur bg-opacity-50 backdrop-blur-md z-50" 
    onClick={closeModal}
  >
    <div 
      className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative" 
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" 
        onClick={closeModal}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">{selectedInvestigation.title}</h2>
      <p className="text-gray-600 mb-4">{selectedInvestigation.details}</p>
      <p className="text-sm text-gray-500">
        {selectedInvestigation.date} | Status: {selectedInvestigation.status}
      </p>
    </div>
  </div>
)}

 
    </div>
      </div>
    </div>
  );
};

// Add CSS animations for marquee
const style = document.createElement('style');
style.textContent = `
  :root {
    --primary-color: #61090b;
    --background-color: #000000;
    --text-color: #ffffff;
  }

 @keyframes marquee {
  from { transform: translateX(0%); }
  to { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0%); }
}

.animate-marquee {
  display: flex;
  animation: marquee 20s linear infinite;
}

.animate-marquee-reverse {
  display: flex;
  animation: marquee-reverse 20s linear infinite;
}



`;
document.head.appendChild(style);

export default Statistics;











