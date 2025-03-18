import { Link } from "react-router-dom";
import { Search, FileText, Shield, AlertTriangle, Fingerprint, Eye, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--background-color)] text-[var(--text-color)] relative overflow-hidden">
      {/* Background fingerprint styles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 transform rotate-45">
          <Fingerprint size={120} color="var(--primary-color)" />
        </div>
        <div className="absolute bottom-20 right-20 transform -rotate-12">
          <Fingerprint size={100} color="var(--primary-color)" />
        </div>
        <div className="absolute top-40 right-40">
          <Fingerprint size={80} color="var(--primary-color)" />
        </div>
      </div>
      
      {/* Red wavy line at the top */}
      <div className="w-full h-2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)] flex items-center">
              <Eye className="mr-2" size={24} />
              CRIME SCENE INVESTIGATOR
            </h3>
            <p className="text-gray-400 mb-4">
              The leading site for criminal investigations and crime scene analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[var(--text-color)] hover:text-[#ffcccb] hover:bg-white/10 p-2 rounded transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[var(--text-color)] hover:text-[#ffcccb] hover:bg-white/10 p-2 rounded transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[var(--text-color)] hover:text-[#ffcccb] hover:bg-white/10 p-2 rounded transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[var(--text-color)] hover:text-[#ffcccb] hover:bg-white/10 p-2 rounded transition duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[var(--primary-color)] flex items-center">
              <FileText className="mr-2" size={18} />
              Crime Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blood-crimes" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Blood Crimes
                </Link>
              </li>
              <li>
                <Link to="/serial-killers" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Serial Killers
                </Link>
              </li>
              <li>
                <Link to="/forensic" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Forensics
                </Link>
              </li>
              <li>
                <Link to="/cold-cases" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Cold Cases
                </Link>
              </li>
              <li>
                <Link to="/crime-analysis" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Crime Analysis
                </Link>
              </li>
              <li>
                <Link to="/crime-scene" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Crime Scene
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[var(--primary-color)] flex items-center">
              <Search className="mr-2" size={18} />
              About Us
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/experts" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Our Experts
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Investigation Methodology
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Our Partnerships
                </Link>
              </li>
              <li>
                <Link to="/submit-case" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Submit a Case
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[var(--primary-color)] flex items-center">
              <Shield className="mr-2" size={18} />
              Site Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/graphic-content" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Graphic Content Policy
                </Link>
              </li>
              <li>
                <Link to="/corrections" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Corrections
                </Link>
              </li>
              <li>
                <Link to="/sources" className="text-gray-400 hover:text-[#ffcccb] flex items-center group">
                  <span className="w-1 h-1 bg-[var(--primary-color)] rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Trusted Sources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#61090b]/30 text-sm text-gray-400 relative">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="flex items-center">
                Â© 2025 Crime Scene Investigator. All rights reserved.
              </p>
            </div>
            <div>
              <p className="flex items-center text-[#61090b]/100">
                Warning: This site contains content that may not be suitable for all ages. Please exercise caution.
                <AlertTriangle size={16} className="ml-2 text-[#61090b]" />
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Red gradient bar at the bottom */}
      <div className="w-full h-1 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80"></div>
    </footer>
  );
}