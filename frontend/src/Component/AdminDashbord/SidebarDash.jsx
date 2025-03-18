import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  PencilIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const SidebarDoners = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      name: "Subscription Card Form",
      path: "/subformDash",
      icon: <ChatBubbleLeftIcon className="w-5 h-5" />,
    },
    {
      name: "Articls Cards",
      path: "/articlescardsDash",
      icon: <DocumentTextIcon className="h-6 w-6 text-white" />,
    },
    {
      name: "Users",
      path: "/UsersDash",
      icon: <UserCircleIcon className="w-5 h-5" />,
    },
    {
      name: "Posts",
      path: "/postform",
      icon: <PencilIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex">
      {/* زر فتح القائمة */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-md lg:hidden"
        >
          ☰ {/* رمز القائمة */}
        </button>
      )}

      {/* القائمة الجانبية */}
      <aside
        className={`bg-[var(--screen-dark)] text-white w-64 min-h-screen flex flex-col p-4 shadow-lg 
          fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:fixed lg:left-0 lg:z-0 lg:w-64`}
      >
        {/* زر إغلاق القائمة (يظهر فقط في الشاشات الصغيرة) */}
        <button
          onClick={toggleSidebar}
          className="mb-4 hover:cursor-pointer hover:text-[#c9c9c9] self-start text-4xl lg:hidden"
        >
          x
        </button>

        {/* عنوان الموقع */}
        <div className="flex items-center">
          <div className="text-3xl font-bold tracking-tighter transition-transform duration-300 hover:scale-105 hover:text-gray-200 cursor-pointer">
            <span className="font-extrabold">CRIME</span>
            <span className="font-light">GAZETTE</span>
          </div>
        </div>

        {/* الروابط */}
        <ul className="flex-1 mt-10 space-y-3">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-row items-center gap-2 p-2 rounded-md ${
                    isActive ? "bg-[var(--screen-red)]" : ""
                  }`
                }
              >
                {link.icon} <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* زر تسجيل الخروج */}
        <NavLink
          to="/sign-in"
          className="mt-auto flex justify-center items-center gap-2 p-3 rounded-md bg-[var(--primary-color)] hover:bg-red-700 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" /> <span>Logout</span>
        </NavLink>
      </aside>
    </div>
  );
};

export default SidebarDoners;
