import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaFilter,
  FaBars,
  FaTrash,
  FaUserEdit,
} from "react-icons/fa";
import {
  UserIcon,
  NewspaperIcon,
  BookOpenIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Swal from "sweetalert2";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 5;

  const [stats, setStats] = useState({
    total: 0,
    user: 0,
    journalist: 0,
    reader: 0,
    admin: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      // Calculate statistics based on the fetched users
      const statsData = {
        total: users.length,
        user: users.filter((user) => user.role === "user").length,
        journalist: users.filter((user) => user.role === "journalist").length,
        reader: users.filter((user) => user.role === "reader").length,
        admin: users.filter((user) => user.role === "admin").length,
      };
      setStats(statsData);
    }
  }, [users]);

  const cards = [
    {
      title: "Total Users",
      count: stats.total,
      icon: <UserIcon size={24} />,
      color: "bg-[#31090b]",
      textColor: "text-white",
    },
    {
      title: "Regular Users",
      count: stats.user,
      icon: <UserIcon size={24} />,
      color: "bg-[var(--screen-red)] ",
      textColor: "text-white",
    },
    {
      title: "Journalists",
      count: stats.journalist,
      icon: <NewspaperIcon size={24} />,
      color: "bg-gray-400",
      textColor: "text-white",
    },
    {
      title: "Administrators",
      count: stats.admin,
      icon: <ShieldCheckIcon size={24} />,
      color: "bg-red-100",
      textColor: "text-[var(--screen-red)] ",
    },
  ];

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "User deleted successfully");
        // ممكن تضيفي إعادة تحميل للبيانات بعد الحذف
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // معالجة تغيير دور المستخدم
  const handleRoleChange = async (userId) => {
    try {
      // إنشاء العناصر الخاصة بالنافذة المنبثقة
      const modalOverlay = document.createElement("div");
      modalOverlay.style.position = "fixed";
      modalOverlay.style.top = "0";
      modalOverlay.style.left = "0";
      modalOverlay.style.width = "100%";
      modalOverlay.style.height = "100%";
      modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      modalOverlay.style.display = "flex";
      modalOverlay.style.justifyContent = "center";
      modalOverlay.style.alignItems = "center";
      modalOverlay.style.zIndex = "1000";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "5px";
      modalContent.style.width = "300px";
      modalContent.style.direction = "rtl";

      const modalTitle = document.createElement("h3");
      modalTitle.textContent = "Chose New Role";
      modalTitle.style.marginBottom = "15px";

      const roleSelect = document.createElement("select");
      roleSelect.style.width = "100%";
      roleSelect.style.padding = "8px";
      roleSelect.style.marginBottom = "20px";
      roleSelect.style.borderRadius = "4px";
      roleSelect.style.border = "1px solid #ddd";

      // إضافة خيارات الأدوار
      const roles = ["user", "journalist", "reader", "admin"];
      roles.forEach((role) => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        roleSelect.appendChild(option);
      });

      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "space-between";

      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Done";
      confirmButton.style.backgroundColor = "#4CAF50";
      confirmButton.style.color = "white";
      confirmButton.style.padding = "8px 16px";
      confirmButton.style.border = "none";
      confirmButton.style.borderRadius = "4px";
      confirmButton.style.cursor = "pointer";

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cansel";
      cancelButton.style.backgroundColor = "#f44336";
      cancelButton.style.color = "white";
      cancelButton.style.padding = "8px 16px";
      cancelButton.style.border = "none";
      cancelButton.style.borderRadius = "4px";
      cancelButton.style.cursor = "pointer";

      buttonContainer.appendChild(cancelButton);
      buttonContainer.appendChild(confirmButton);

      // إضافة العناصر إلى النافذة المنبثقة
      modalContent.appendChild(modalTitle);
      modalContent.appendChild(roleSelect);
      modalContent.appendChild(buttonContainer);
      modalOverlay.appendChild(modalContent);

      // إضافة النافذة المنبثقة إلى الصفحة
      document.body.appendChild(modalOverlay);

      // معالجة الأحداث
      cancelButton.addEventListener("click", () => {
        document.body.removeChild(modalOverlay);
      });

      confirmButton.addEventListener("click", async () => {
        const newRole = roleSelect.value;
        document.body.removeChild(modalOverlay);

        // إرسال الطلب لتحديث الدور
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}/role`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Role!",
            text: "The role has been successfully updated 🎉",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "An error occurred!",
            text: "Failed to update the role. Please try again.",
          });
        }
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // تصفية المستخدمين حسب البحث والدور
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "all" || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  // حساب الصفحات
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="max-w-7xl lg:ml-75 flex flex-col">
      <div className="p-6 my-5 bg-gray-50 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          User Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className={`h-2 ${card.color}`}></div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-700">{card.title}</h3>
                  <div
                    className={`p-2 rounded-full ${card.color} bg-opacity-10`}
                  >
                    <div className={card.textColor}>{card.icon}</div>
                  </div>
                </div>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-gray-800">
                    {card.count}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">users</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--screen-red)] text-center bg-white rounded-lg py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-[var(--screen-red)]">
        USERS
      </h1>

      {/* Toggle Filters Button for Mobile */}
      <button
        className="md:hidden w-full mb-4 p-3 bg-white rounded-lg shadow flex items-center justify-center"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaBars className="mr-2" />
        <span>
          {showFilters ? "Hide Search Options" : "Show Search Options"}
        </span>
      </button>

      {/* Filters Section */}
      <div
        className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md mb-4 sm:mb-6 flex flex-col md:flex-row gap-4 ${
          showFilters ? "block" : "hidden md:flex"
        }`}
      >
        <div className="w-full md:w-1/2 relative">
          <input
            type="text"
            placeholder="Search by username or email..."
            className="w-full p-3 sm:p-4 pl-10 border border-gray-300 rounded-lg focus:ring-[var(--screen-red)] focus:border-[var(--screen-red)] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="w-full md:w-1/2 relative">
          <select
            className="w-full p-3 sm:p-4 pl-10 border border-gray-300 rounded-lg bg-white focus:ring-[var(--screen-red)] focus:border-[var(--screen-red)] transition-all"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="journalist">Journalists</option>
          </select>
          <FaFilter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white mb-10 rounded-lg shadow-md overflow-hidden w-full hover:shadow-lg transition-all duration-300">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-b-orange-950 mx-auto"></div>
            <p className="text-gray-500 text-lg mt-4">Loading users...</p>
          </div>
        ) : (
          <>
            {/* Table View for Large Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--screen-red)] ">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-white">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                      Username
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                      Subscription
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                      Created At
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-6">{index + 1}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700 font-medium">
                          {user.username}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-[var(--screen-red)]">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {user.subscriptionPlan || "None"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            user.isActivated
                              ? "bg-green-500 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {user.isActivated ? "Activated" : "Deactivated"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            className="p-2 hover:cursor-pointer text-[var(--screen-red)] hover:bg-red-50 rounded-full transition-colors duration-200"
                            onClick={() =>
                              handleRoleChange(user._id, "journalist")
                            }
                            title="Edit Role"
                          >
                            <FaUserEdit className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 hover:cursor-pointer text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                            onClick={() => handleDelete(user._id)}
                            title="Delete User"
                          >
                            <FaTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card View for Mobile */}
            <div className="md:hidden flex flex-col">
              {currentUsers.map((user) => (
                <div
                  key={user._id}
                  className="border-b border-gray-200 p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-lg font-medium text-gray-900">
                      {user.username}
                    </div>
                    <div className="flex">
                      <button
                        className="p-2 hover:cursor-pointer text-[var(--screen-red)] hover:bg-red-50 rounded-full transition-colors duration-200 ml-1"
                        onClick={() => handleRoleChange(user._id)}
                        title="Edit Role"
                      >
                        <FaUserEdit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:cursor-pointer text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                        onClick={() => handleDelete(user._id)}
                        title="Delete User"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Email: </span>
                    {user.email}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-between items-center mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-[var(--screen-red)]">
                      {user.role}
                    </span>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActivated
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {user.isActivated ? "Activated" : "Deactivated"}
                    </span>

                    <span className="text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users match your search</p>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && !loading && (
          <div className="flex justify-center items-center p-4 border-t border-gray-200">
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-sm ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-[var(--screen-red)] border border-gray-300"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      currentPage === page
                        ? "bg-[var(--screen-red)] text-white"
                        : "bg-white text-gray-700 hover:bg-red-50 hover:text-[var(--screen-red)] border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-[var(--screen-red)] border border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
