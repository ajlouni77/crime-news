
"use client";

import { useRef, useEffect, useState } from "react";
import {
  Search,
  FileText,
  Users,
  Shield,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import hero from "../assets/Recording 2025-03-16 061254.mp4"; // تأكد أن اسم الملف صحيح
import { Play, Pause } from "lucide-react"; // أيقونات التشغيل والإيقاف
// import crimeSceneImage from "../assets/crime-scene.png"; // تأكد من المسار الصحيح للصورة
import crimeSceneImage from "../assets/finger.jpg"; // تأكد من المسار الصحيح للصورة





export default function AboutPage() {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in-section");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.75;

        if (isInViewport) {
          element.classList.add("is-visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = false; // تشغيل الصوت
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };







  return (
    <div className="min-h-screen bg-white text-black">
 
  {/* Crime Scene Tape Header */}
  <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {/* التعتيم فوق الصورة */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* صورة الخلفية */}
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0edf54fb574846e21473a429b0b18b45.jpg-Mh2yoRBunVshi3gTFw7kZiht8ZXryM.jpeg"
        alt="Crime Scene Tape"
        className="object-cover w-full h-full"
      />

      {/* النص والمحتوى فوق الصورة */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
        <h1
          className={`text-5xl md:text-7xl font-bold text-white transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="font-extrabold">CRIME</span>
          <span className="font-light">GAZETTE</span>
        </h1>
        <div className="h-1 w-32 bg-[#61090b] mb-4"></div>
        <p
          className={`text-xl text-white italic max-w-2xl text-center backdrop-blur-md transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Because justice begins with information
        </p>
      </div>
    </div>

      <div className="max-w-6xl mx-auto p-6">
    
        {/* Mission Statement */}
        <div className="my-16 fade-in-section">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#61090b]"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl">
              In a world of headlines and soundbites, we dig deeper. Crime
              Gazette was founded on the principle that the public deserves
              comprehensive coverage of criminal justice—not just sensational
              stories, but the complex realities behind them. We illuminate the
              shadows where truth hides.
            </p>
          </div>
        </div>


     {/* Video Section with Crime Scene Tape Border */}
<div className="my-8 fade-in-section"> {/* ✅ تصغير المسافة الخارجية */}
  <div className="relative">
    {/* ✅ شريط التحذير العلوي */}
    <div className="absolute -top-3 left-0 right-0 h-6 overflow-hidden"> {/* 🔽 تصغير الارتفاع */}
      <div className="w-full h-full bg-yellow-400 flex items-center transform -rotate-1">
        <div className="text-black font-bold text-xs whitespace-nowrap animate-marquee">
          CRIME SCENE DO NOT CROSS • CRIME SCENE DO NOT CROSS • CRIME SCENE DO NOT CROSS •
        </div>
      </div>
    </div>

    {/* ✅ شريط التحذير السفلي */}
    <div className="absolute -bottom-3 left-0 right-0 h-6 overflow-hidden"> {/* 🔽 تصغير الارتفاع */}
      <div className="w-full h-full bg-yellow-400 flex items-center transform rotate-1">
        <div className="text-black font-bold text-xs whitespace-nowrap animate-marquee-reverse">
          CRIME SCENE DO NOT CROSS • CRIME SCENE DO NOT CROSS • CRIME SCENE DO NOT CROSS •
        </div>
      </div>
    </div>

    {/* ✅ صندوق الفيديو */}
    <div className="relative h-[300px] md:h-[400px] bg-black rounded-md overflow-hidden"> {/* 🔽 تصغير الارتفاع */}
      {/* 🎥 فيديو الخلفية */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 transition-opacity duration-300"
        loop
        playsInline
        onClick={togglePlay} // تشغيل/إيقاف عند النقر
      >
        <source src={hero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔴 تراكب شفاف لتحسين الوضوح */}
      <div className="absolute inset-0 bg-black/40 md:bg-red-500/20 transition-all pointer-events-none" />

      {/* 🔘 زر التشغيل/الإيقاف */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        <button className="bg-white text-black p-4 rounded-full shadow-lg opacity-90 hover:opacity-100 transition flex items-center justify-center">
          {isPlaying ? <Pause size={32} className="text-black" /> : <Play size={32} className="text-black" />}
        </button>
      </div>
    </div>
  </div>
</div>


        {/* Our Approach Cards */}
        <div className="my-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#61090b] shadow-md hover:shadow-xl transition-all">
              <div className="flex items-start">
                <div className="mr-4 bg-[#61090b] text-white p-2 rounded">
                  <Search size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Investigative Journalism
                  </h3>
                  <p className="text-gray-700">
                    Our journalists don't just report—they investigate. With
                    backgrounds in criminology, law enforcement, and legal
                    practice, our team brings unparalleled expertise to every
                    story.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-[#61090b] shadow-md hover:shadow-xl transition-all">
              <div className="flex items-start">
                <div className="mr-4 bg-[#61090b] text-white p-2 rounded">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Comprehensive Coverage
                  </h3>
                  <p className="text-gray-700">
                    We follow cases from crime scene to courtroom, providing
                    context that others miss. Our coverage examines not just
                    what happened, but why it matters.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-[#61090b] shadow-md hover:shadow-xl transition-all">
              <div className="flex items-start">
                <div className="mr-4 bg-[#61090b] text-white p-2 rounded">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ethical Standards</h3>
                  <p className="text-gray-700">
                    Sensationalism sells, but integrity matters more. We balance
                    the public's right to know with respect for victims, due
                    process, and the presumption of innocence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-[#61090b] shadow-md hover:shadow-xl transition-all">
              <div className="flex items-start">
                <div className="mr-4 bg-[#61090b] text-white p-2 rounded">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Impact</h3>
                  <p className="text-gray-700">
                    Through investigative persistence, we've helped reopen cold
                    cases, exposed misconduct, and advocated for justice system
                    reforms that benefit communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


{/* Statistics Section with Bottom Background */}
<div className="my-16 fade-in-section relative rounded-xl overflow-hidden">
  {/* Background Image Positioned at Bottom */}
  <div className="absolute inset-x-0 bottom-0 h-[250px] md:h-[300px] bg-cover bg-bottom" 
       style={{ backgroundImage: 'url(https://i.pinimg.com/736x/46/bd/51/46bd510650795680870cd4efd9250605.jpg)' }}>
  </div>

  {/* Overlay Content */}
  <div className="relative z-10 p-8 md:p-12 flex flex-col items-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
      By The Numbers
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {[
        { number: "250+", label: "Cases Covered" },
        { number: "18", label: "Global Correspondents" },
        { number: "12", label: "Years Reporting" },
        { number: "24/7", label: "News Coverage" },
      ].map(({ number, label }, index) => (
        <div key={index} className="relative bg-transparent backdrop-blur-md p-4 md:p-6 rounded-lg border border-white/40 text-center">
          <div className="relative z-10">
            <div className="text-4xl font-bold text-white mb-2">{number}</div>
            <div className="text-sm text-white">{label}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


        {/* Team Section */}
        <div className="my-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Alexandra Reeves"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold mb-1 text-center">
                Alexandra Reeves
              </h4>
              <p className="text-[#61090b] mb-3 text-sm text-center font-medium">
                Editor-in-Chief
              </p>
              <p className="text-gray-600 text-sm text-center">
                Former prosecutor with 15 years experience covering high-profile
                criminal trials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Marcus Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold mb-1 text-center">
                Marcus Chen
              </h4>
              <p className="text-[#61090b] mb-3 text-sm text-center font-medium">
                Lead Investigator
              </p>
              <p className="text-gray-600 text-sm text-center">
                Retired detective specialized in cold case investigations and
                forensic analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbGHj2qO5lNj0rdKhw7yVR9BBHrYHACcD5zQ&s"
                  alt="Jasmine Torres"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold mb-1 text-center">
                Jasmine Torres
              </h4>
              <p className="text-[#61090b] mb-3 text-sm text-center font-medium">
                Data Analyst
              </p>
              <p className="text-gray-600 text-sm text-center">
                Criminal justice statistician who brings context and pattern
                analysis to our reporting.
              </p>
            </div>
          </div>
        </div>


        {/* Editorial Process with Crime Scene Silhouette */}
        <div className="my-16 fade-in-section">
          <div className="relative bg-gray-100 rounded-xl p-8 md:p-12">
            <div className="absolute right-8 bottom-8 opacity-40 w-40 h-40">
              <img
                src={crimeSceneImage}
                alt="Crime Scene Silhouette"
                className="w-full h-full"
              />
            </div>

            <div className="flex items-center mb-6">
              <AlertTriangle className="text-[#61090b] mr-3" size={28} />
              <h3 className="text-2xl font-bold">Our Editorial Process</h3>
            </div>

            <p className="text-gray-700 mb-8 max-w-3xl">
              Every story passes through our rigorous 4-step verification
              process before publication:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border-t-4 border-[#61090b]">
                <div className="bg-[#61090b] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  1
                </div>
                <p className="text-sm font-medium text-center">
                  Initial Source Verification
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow border-t-4 border-[#61090b]">
                <div className="bg-[#61090b] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  2
                </div>
                <p className="text-sm font-medium text-center">
                  Expert Consultation
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow border-t-4 border-[#61090b]">
                <div className="bg-[#61090b] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  3
                </div>
                <p className="text-sm font-medium text-center">Legal Review</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow border-t-4 border-[#61090b]">
                <div className="bg-[#61090b] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  4
                </div>
                <p className="text-sm font-medium text-center">
                  Editor Approval
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-6">Contact Our Newsroom</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have a tip? Witness information? Story idea? Our secure channels
            ensure source protection.
          </p>
          <button
            className="bg-[#61090b] hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition-colors"
            onClick={() => window.open("https://wa.me/962787967253", "_blank")}
          >
            Secure Tip Line
          </button>
        </div>
      </div>
    </div>
  );
}
