import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Lock,
  Wifi,
  Globe,
  Server,
  Database,
  CreditCard,
  Smartphone,
  ChevronRight,
  ExternalLink,
  Clock,
  Eye,
} from "lucide-react";

export default function CybercrimeSection() {
  const [activeTab, setActiveTab] = useState("latest");

  const cybercrimeNews = [
    {
      id: 1,
      title: "Major Banking System Breach Affects Millions",
      excerpt:
        "Hackers gained access to customer data in one of the largest financial security breaches this year.",
      category: "Data Breach",
      date: "2 hours ago",
      severity: "high",
      views: 4328,
      icon: <Database className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "New Ransomware Variant Targets Healthcare Systems",
      excerpt:
        "Security researchers have identified a sophisticated ransomware strain specifically designed to exploit medical record systems.",
      category: "Ransomware",
      date: "6 hours ago",
      severity: "critical",
      views: 2891,
      icon: <Lock className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Phishing Campaign Impersonates Major Tech Companies",
      excerpt:
        "Users report receiving convincing emails claiming to be from Google and Microsoft requesting password verification.",
      category: "Phishing",
      date: "1 day ago",
      severity: "medium",
      views: 1756,
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Critical Vulnerability Found in Popular IoT Devices",
      excerpt:
        "Security researchers discover zero-day exploit affecting millions of smart home devices worldwide.",
      category: "Vulnerability",
      date: "2 days ago",
      severity: "high",
      views: 3102,
      icon: <Wifi className="h-5 w-5" />,
    },
    {
      id: 5,
      title: "Cryptocurrency Exchange Loses $200M in Hack",
      excerpt:
        "Attackers exploited a smart contract vulnerability to drain funds from one of the largest crypto exchanges.",
      category: "Theft",
      date: "3 days ago",
      severity: "high",
      views: 5437,
      icon: <CreditCard className="h-5 w-5" />,
    },
  ];

  const securityTips = [
    {
      id: 1,
      title: "Use Strong, Unique Passwords",
      description:
        "Create complex passwords and never reuse them across different services. Consider using a password manager.",
      icon: <Lock className="h-10 w-10 text-[#61090b]" />,
    },
    {
      id: 2,
      title: "Enable Two-Factor Authentication",
      description:
        "Add an extra layer of security by requiring a second form of verification beyond just your password.",
      icon: <Shield className="h-10 w-10 text-[#61090b]" />,
    },
    {
      id: 3,
      title: "Keep Software Updated",
      description:
        "Regularly update your operating system, browsers, and apps to patch security vulnerabilities.",
      icon: <Smartphone className="h-10 w-10 text-[#61090b]" />,
    },
    {
      id: 4,
      title: "Be Wary of Phishing Attempts",
      description:
        "Verify the sender before clicking links or downloading attachments in emails, even if they appear legitimate.",
      icon: <AlertTriangle className="h-10 w-10 text-[#61090b]" />,
    },
  ];

  const severityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };

  return (
  //   <div
  //   className="w-full relative text-white overflow-hidden"
  //   style={{
  //     backgroundColor: "rgba(0, 31, 51, 0.6)", // اللون الأزرق الغامق مع شفافية 70%
  //   }}
  // >
<div
  className="w-full relative text-[#ffffff] overflow-hidden"
  style={{
    backgroundImage: "url('https://www.csoonline.com/wp-content/uploads/2023/08/hacker-handcuffs-laptop-cybercrime-cyber-crime-arrested-100937828-orig.jpg?quality=50&strip=all')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "30px 30px",
      }}
    ></div>
  </div>

  {/* Digital Circuit Lines */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-full h-1 bg-[#61090b]"></div>
    <div className="absolute top-0 left-0 w-1 h-full bg-[#61090b]"></div>
    <div className="absolute top-20 left-0 w-full h-0.5 bg-[#61090b]"></div>
    <div className="absolute top-0 left-40 w-0.5 h-full bg-[#61090b]"></div>
    <div className="absolute top-0 right-60 w-0.5 h-full bg-[#61090b]"></div>
    <div className="absolute bottom-40 left-0 w-full h-0.5 bg-[#61090b]"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 p-6 md:p-8 w-[85%] mx-auto flex flex-col items-center text-center">
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 w-full">
      <div>
        <div className="flex items-center">
          <div className="bg-[#61090b] p-2 rounded-lg mr-3">
            <Globe className="h-6 w-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Cybercrime Watch</h2>
        </div>
        <p className="text-[#ffffff] mt-2">
          Latest news on hacks, fraud, and digital threats
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center space-x-2">
        <div className="inline-flex items-center bg-[#61090b]/50 text-[#ffffff] border border-[#61090b] px-2 py-1 rounded">
          <Clock className="h-3 w-3 mr-1" />
          Live Updates
        </div>
        <div className="relative group">
          <button className="bg-[#61090b]/50 border border-[#61090b] text-[#ffffff] hover:bg-[#61090b] px-2 py-1 rounded">
            <Shield className="h-4 w-4" />
          </button>
          <div className="opacity-0 group-hover:opacity-100 absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-[#ffffff] text-xs rounded p-2">
            Threat Level: Elevated
          </div>
        </div>
      </div>
    </div>

    {/* Tabs */}
    <div className="mb-6 flex space-x-4  border-b border-[#61090b]">
      <button
        className={`px-4 py-2 focus:outline-none ${
          activeTab === "latest" ? "bg-[#61090b]" : "bg-transparent"
        }`}
        onClick={() => setActiveTab("latest")}
      >
        Latest Attacks
      </button>
      <button
        className={`px-4 py-2 focus:outline-none ${
          activeTab === "tips" ? "bg-[#61090b]" : "bg-transparent"
        }`}
        onClick={() => setActiveTab("tips")}
      >
        Security Tips
      </button>
      <button
        className={`px-4 py-2 focus:outline-none ${
          activeTab === "alerts" ? "bg-[#61090b]" : "bg-transparent"
        }`}
        onClick={() => setActiveTab("alerts")}
      >
        Global Alerts
      </button>
    </div>

    {/* Tab Content */}
    {activeTab === "latest" && (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cybercrimeNews.map((news) => (
          <div
            key={news.id}
            className="bg-gray-800/90 border border-gray-700 backdrop-blur-sm overflow-hidden hover:bg-gray-800/100 transition-all group p-4 rounded"
          >
            <div className="flex justify-between items-start">
              <span className={`inline-block px-2 py-1 rounded ${severityColors[news.severity]}`}>
                {news.category}
              </span>
              <div className="flex items-center text-xs text-gray-300">
                <Eye className="h-3 w-3 mr-1" />
                {news.views.toLocaleString()}
              </div>
            </div>
            <h3 className="text-lg mt-2 group-hover:text-[#61090b] transition-colors font-bold">
              {news.title}
            </h3>
            <p className="text-gray-300 text-sm">{news.date}</p>
            <p className="text-gray-200 text-sm mt-2">{news.excerpt}</p>
            <div className="flex justify-end mt-4">
              <button className="text-[#61090b] hover:text-[#ffffff] text-sm flex items-center">
                Read more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {activeTab === "tips" && (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityTips.map((tip) => (
          <div key={tip.id} className="bg-gray-800/90 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-start">
              <div className="p-3 bg-gray-900/80 rounded-lg mr-4">{tip.icon}</div>
              <div>
                <h3 className="text-lg font-medium text-[#ffffff] mb-2">{tip.title}</h3>
                <p className="text-gray-300 text-sm">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {activeTab === "alerts" && (
      <div className="mt-6">
        <div className="bg-gray-800/90 border border-red-900/50 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-900/80 rounded-full mr-3">
              <AlertTriangle className="h-6 w-6 text-red-300" />
            </div>
            <h3 className="text-xl font-medium text-red-200">Critical Alert: Banking Trojan</h3>
          </div>
          <p className="text-gray-300 mb-4">
            A sophisticated banking trojan is currently targeting financial institutions worldwide. The malware can
            intercept banking credentials and bypass two-factor authentication.
          </p>
          <div className="bg-gray-900/80 rounded-lg p-4 text-sm text-gray-300">
            <p className="font-medium text-red-300 mb-2">Affected Systems:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Windows 10 and 11 systems</li>
              <li>Mobile banking applications</li>
              <li>Chrome and Firefox browsers</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/90 border border-yellow-900/50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-1.5 bg-yellow-900/80 rounded-full mr-2">
                <Wifi className="h-4 w-4 text-yellow-300" />
              </div>
              <h3 className="text-lg font-medium text-yellow-200">Public WiFi Vulnerability</h3>
            </div>
            <p className="text-gray-300 text-sm">
              New exploit allows attackers to intercept traffic on public WiFi networks even when using HTTPS.
            </p>
          </div>

          <div className="bg-gray-800/90 border border-blue-900/50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-1.5 bg-blue-900/80 rounded-full mr-2">
                <Server className="h-4 w-4 text-blue-300" />
              </div>
              <h3 className="text-lg font-medium text-blue-200">Cloud Service Outages</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Multiple cloud providers experiencing DDoS attacks resulting in service disruptions.
            </p>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Bottom Decorative Element */}
  <div className="relative h-2 bg-gradient-to-r from-[#61090b] via-[#61090b] to-[#61090b]"></div>
</div>
  );
}