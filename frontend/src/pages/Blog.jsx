// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";


// const callouts = [
//     {
//       name: "How to Protect Yourself from Online Fraud?",
//       description:
//         "With the rise of digital transactions, online fraud has become more widespread. Here are effective ways to protect yourself from scams and fraud on the internet.",
//       details:
//         "Online fraud includes various methods such as bank data theft, phishing scams, and identity fraud. It is crucial to verify websites before entering your details and never share personal information with untrusted sources. Using security software and regularly updating your passwords are key measures to minimize these risks.",
//       imageSrc:
//         "https://i.pinimg.com/736x/69/19/0b/69190bcf377f80295686f0568f7a326d.jpg",
//       imageAlt: "A person using a laptop with a security warning on the screen.",
//       date: "March 15",
//       tags: ["Cybercrime", "Digital Security"],
//       href: "#",
//     },
//     {
//       name: "Kidnapping Crimes: How to Protect Yourself and Your Children?",
//       description:
//         "Kidnapping is one of the most dangerous crimes threatening society. Learn essential ways to protect yourself and your children from such situations.",
//       details:
//         "Kidnapping can happen anytime and anywhere, so raising children's awareness about the dangers of talking to strangers and accepting suspicious offers is crucial. Always monitor their whereabouts and use location-tracking apps to ensure their safety. Teaching them safe words for emergencies is also highly recommended.",
//       imageSrc:
//         "https://i.pinimg.com/736x/21/b9/d4/21b9d4d02402a9f970ae6f09ba377ef1.jpg",
//       imageAlt: "A child holding hands with a parent in the street.",
//       date: "February 20",
//       tags: ["Personal Safety", "Kidnapping Crimes"],
//       href: "#",
//     },
//     {
//       name: "Murder Cases: How to Address the Rise of Violence in Society?",
//       description:
//         "The increase in murder crimes poses a serious threat to communities. In this article, we discuss the main causes behind these crimes and how to combat them.",
//       details:
//         "Murder crimes often stem from factors such as family disputes, social violence, and economic problems. Raising awareness, improving living conditions, and enhancing security can help reduce crime rates. Supporting prevention programs and early intervention plays a crucial role in deterring criminals and reducing these tragic incidents.",
//       imageSrc:
//         "https://i.pinimg.com/736x/a3/da/c8/a3dac8689e93d76f88649007c01ed125.jpg",
//       imageAlt: "Police caution tape at a crime scene.",
//       date: "March 10",
//       tags: ["Crime", "Community Violence"],
//       href: "#",
//     },
//     {
//       name: "Financial Crimes: How to Avoid Bank Fraud?",
//       description:
//         "With technological advancements, financial crimes such as bank fraud and identity theft have increased. Here are some tips to avoid becoming a victim of these crimes.",
//       details:
//         "Financial crimes include credit card theft, phone scams, and check fraud. To stay safe, it is recommended to monitor your bank accounts regularly, use two-factor authentication when logging in, and never share your financial information with unofficial sources. Be cautious of suspicious messages asking for your personal data.",
//       imageSrc:
//         "https://i.pinimg.com/736x/e0/67/03/e0670352b9624b39d17e1f2af2c87a07.jpg",
//       imageAlt: "A credit card with a digital lock symbolizing financial security.",
//       date: "March 5",
//       tags: ["Financial Crimes", "Banking Security"],
//       href: "#",
//     },
//     {
//       name: "The Story of a Cybercrime Victim: How a Student Lost His Savings",
//       description:
//         "Cybercrime is becoming increasingly sophisticated, targeting unsuspecting victims. Here’s the story of a student who fell victim to an online scam.",
//       details:
//         "Ahmed, a university student, received an email from what seemed like his bank, asking him to verify his account details. Without thinking twice, he entered his credentials, only to find his savings wiped out the next day. Hackers had used a phishing scam to steal his login information. This incident highlights the importance of checking email sources, avoiding clicking on suspicious links, and enabling two-factor authentication to enhance security.",
//       imageSrc:
//         "https://i.pinimg.com/736x/21/9e/b8/219eb8873f3ed51aa76ba0a433abc250.jpg",
//       imageAlt: "A worried man looking at his laptop screen.",
//       date: "March 8",
//       tags: ["Cybercrime", "Online Scams"],
//       href: "#",
//     },
//     {
//       name: "A Mother's Nightmare: How a Quick-Thinking Stranger Saved a Child from Kidnapping",
//       description:
//         "Kidnapping attempts can happen anywhere, but awareness and quick action can make a difference. Read this real-life story of a mother who almost lost her child.",
//       details:
//         "While shopping in a busy mall, Sarah momentarily let go of her 5-year-old son's hand. In a matter of seconds, a stranger attempted to lead him away. Luckily, another shopper noticed the unusual behavior and intervened, preventing what could have been a tragic incident. This story serves as a reminder for parents to always keep an eye on their children in public places, teach them not to talk to strangers, and establish emergency response strategies.",
//       imageSrc:
//         "https://i.pinimg.com/736x/70/b4/19/70b41985d746c7bff4172f2b52c6eff6.jpg",
//       imageAlt: "A concerned mother holding her child tightly in a crowded place.",
//       date: "February 25",
//       tags: ["Personal Safety", "Kidnapping Prevention"],
//       href: "#",
//     },
    
//   ];




// const Blog = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const articlesPerPage = 4;

//   // حساب بداية ونهاية المقالات المعروضة
//   const indexOfLastArticle = currentPage * articlesPerPage;
//   const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
//   const currentArticles = callouts.slice(indexOfFirstArticle, indexOfLastArticle);

//   // حساب عدد الصفحات
//   const totalPages = Math.ceil(callouts.length / articlesPerPage);




//   return (


// <>
// <div
//   className="relative w-full h-80 bg-cover bg-center"
//   style={{ backgroundImage: 'url("https://i.pinimg.com/736x/98/34/65/98346536f127a24ec131589322a1a001.jpg")' }} // Replace with actual image URL
// >
//   <div className="absolute inset-0 bg-black opacity-50"></div>
//   <div className="relative flex items-center justify-center h-full">
//     <div className="text-center text-white p-8">
//       <h1 className="text-5xl font-bold mb-4">
//         Stay Informed, Stay Safe
//       </h1>
//       <p className="text-lg mb-6">
//         Understanding crime is the first step towards prevention. Explore our resources and empower yourself with knowledge.
//       </p>
//     </div>
//   </div>
// </div>


// {/*  hero section  */}









// <div className="flex" style={{ width: '90%', margin: '0 auto' }}>  {/* Sidebar */}
//   <div className="w-1/4 p-4 bg-gray-200 rounded-l">
//    {/* Sidebar - One third of the screen from the left */}
// <div className="col-lg-4">
//   <div className="bg-white shadow-sm rounded p-4 mb-4">
//     <h5 className="font-bold mb-3" style={{ color: '#8b0d11' }}>Latest Crime News</h5>
//     <ul className="list-unstyled">
//       <li className="d-flex align-items-center mb-3">
//         <img
//           className="img-fluid"
//           src="https://i.pinimg.com/736x/f9/04/07/f90407a76c446705e8557191afd2ee01.jpg" // Replace with real URLs
//           alt="Crime News"
//           style={{ width: "30%" }}
//         />
//         <div className="ms-3">
//           <Link to="#" style={{ color: '#8b0d11' }}>
//             Shocking Murder Incident in Downtown...
//           </Link>
//           <small className="d-block text-muted">March 10, 2023</small>
//         </div>
//       </li>
//       <li className="d-flex align-items-center mb-3">
//         <img
//           className="img-fluid"
//           src="https://i.pinimg.com/736x/f9/7c/b1/f97cb11bea35baac156be9236a0dff76.jpg"
//           alt="Crime News"
//           style={{ width: "30%" }}
//         />
//         <div className="ms-3">
//           <Link to="#" style={{ color: '#8b0d11' }}>
//             Is Stress Taking Over Your Life? A Look into Recent Crimes...
//           </Link>
//           <small className="d-block text-muted">March 14, 2023</small>
//         </div>
//       </li>
//     </ul>
//   </div>

//   <div className="bg-white shadow-sm rounded p-4 mb-4">
//     <h5 className="font-bold mb-3" style={{ color: '#8b0d11' }}>Investigation Reports</h5>
//     <ul className="list-unstyled">
//       <li className="d-flex align-items-center mb-3">
//         <img
//           className="img-fluid"
//           src="https://static.ffx.io/images/$zoom_1%2C$multiply_0.5223%2C$ratio_1.777778%2C$width_1187%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/e15900c94bc4901c64a6405571f97f0a15e2e732" // Replace with real URLs
//           alt="Investigation Report"
//           style={{ width: "30%" }}
//         />
//         <div className="ms-3">
//           <Link to="#" style={{ color: '#8b0d11' }}>
//             Deep Dive into Local Crime Patterns...
//           </Link>
//           <small className="d-block text-muted">March 15, 2023</small>
//         </div>
//       </li>
//       <li className="d-flex align-items-center mb-3">
//         <img
//           className="img-fluid"
//           src="https://i.pinimg.com/736x/79/10/0d/79100d104b03dffe94e3f9942aac906c.jpg"
//           alt="Investigation Report"
//           style={{ width: "30%" }}
//         />
//         <div className="ms-3">
//           <Link to="#" style={{ color: '#8b0d11' }}>
//             Understanding the Rise in Cyber Crimes...
//           </Link>
//           <small className="d-block text-muted">March 16, 2023</small>
//         </div>
//       </li>
//     </ul>
//   </div>

//   <div className="bg-white shadow-sm rounded p-4 mb-4">
//     <h5 className="font-bold mb-3" style={{ color: '#8b0d11' }}>Crime Scene Photos</h5>
//     <div className="d-flex flex-wrap">
//       <img
//         className="img-fluid m-1"
//         src="https://i.pinimg.com/236x/36/7e/a6/367ea6a970a45194410ebe6dcb3e3a86.jpg" // Replace with real URLs
//         alt="Crime Scene"
//         style={{ width: "30%" }}
//       />
//       <img
//         className="img-fluid m-1"
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShN-A8Zirxiiy6peIUD7qzxsHpow3lpaeJXg&s"
//         alt="Crime Scene"
//         style={{ width: "30%" }}
//       />
//       <img
//         className="img-fluid m-1"
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptRhdkiD7W8F4_eX5HEobTg9IwWBThnGrhw&s"
//         alt="Crime Scene"
//         style={{ width: "30%" }}
//       />
      
//       {/* Add more images as needed */}
//     </div>
//   </div>

//   <div className="bg-white shadow-sm rounded p-4 mb-4">
//     <h5 className="font-bold" style={{ color: '#8b0d11' }}>Newsletter</h5>
//     <form>
//       <div className="mb-3">
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Enter your email"
//           required
//           style={{ backgroundColor: '#ffffff', color: '#000' }}
//         />
//       </div>
//       <button type="submit" className="btn" style={{ backgroundColor: '#8b0d11', color: '#ffffff' }}>
//         Subscribe
//       </button>
//     </form>
//   </div>
// </div>
   
//   </div>

//   {/* Main Content */}
//  <div className="bg-white p-4 rounded w-3/4">
//       <h2 className="text-2xl font-bold text-white">Collections</h2>

//       <div className="mt-6 space-y-12">
//         {currentArticles.map((callout, index) => (
//           <div key={callout.name} className="bg-white rounded-lg shadow-md overflow-hidden group relative">
// <Link to={`/blog/${callout.id}`} state={{ article: callout }} className="block">           <div className="absolute top-4 left-4 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
//                 {callout.date}
//               </div>
//               <img alt={callout.imageAlt} src={callout.imageSrc} className="w-full h-64 object-cover group-hover:opacity-75" />
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-red-700">{callout.name}</h3>
//                 <p className="mt-2 text-gray-600">{callout.description}</p>
//               </div>
//               <div className="p-6 pt-0 flex justify-between text-sm text-gray-600">
//                 {callout.tags.map((tag) => (
//                   <span key={tag} className="bg-red-700 text-white px-2 py-1 rounded-full">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* الترقيم */}
//       <nav className="mt-10 flex justify-center">
//         <ul className="flex space-x-2">
//           <li>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 rounded bg-gray-300 text-black disabled:opacity-50"
//             >
//               &laquo;
//             </button>
//           </li>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <li key={i}>
//               <button
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-red-700 text-white" : "bg-gray-300 text-black"}`}
//               >
//                 {i + 1}
//               </button>
//             </li>
//           ))}
//           <li>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 rounded bg-gray-300 text-black disabled:opacity-50"
//             >
//               &raquo;
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
// </div>


// </>

//   );
// };

// export default Blog;
  



import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Fetch posts from the API endpoint
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/admin");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

//  useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       // Optionally, store the token in state if needed
//       setToken(storedToken);
//       setToken(user);
//     }
//   }, []);


// useEffect(() => {
//   const fetchUserProfile = async () => {
//     try {
//       // Retrieve token from localStorage
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("❌ No token found in localStorage");
//         return;
//       }

//       // Decode token to extract user ID
//       const decodedToken = jwtDecode.default(token);
//       if (!decodedToken.userId) {
//         console.error("❌ No user ID found in token");
//         return;
//       }

//       console.log("✅ Extracted User ID from token:", decodedToken.userId);

//       // Fetch user profile using the token in the Authorization header
//       const response = await axios.get("http://localhost:5000/api/users/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("✅ User profile fetched:", response.data);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error("❌ Error fetching profile:", error.response?.data || error.message);
//     }
//   };

//   fetchUserProfile();
// }, []);

 useEffect(() => {
    // const fetchUserProfile = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/api/users/gituserpayment", {
    //       withCredentials: true,
    //     });
    //     console.log("✅ User profile fetched:", response.data);
    //     setUser(response.data.user);
    //   } catch (error) {
    //     console.error("❌ Error fetching profile:", error.response?.data || error.message);
    //   }
    // };
const fetchUserProfile = async () => {
  try {
    // 🔥 1️⃣ Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found in localStorage");
      return;
    }

    // 🔥 2️⃣ Decode the token to extract user ID
    const decodedToken = jwtDecode(token); // Extracts { userId: "67d44acc1bdee5c049d5519e", iat: ..., exp: ... }

    if (!decodedToken.userId) {
      console.error("❌ No user ID found in token");
      return;
    }

    console.log("✅ Extracted User ID from token:", decodedToken.userId);

    // 🔥 3️⃣ Fetch user profile using token (No need to send user ID in request)
    const response = await axios.get(
      "http://localhost:5000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      }
    );

    console.log("✅ User profile fetched:", response.data);
    setUser(response.data.user);
  } catch (error) {
    console.error(
      "❌ Error fetching profile:",
      error.response?.data || error.message
    );
  }
};
    fetchUserProfile();
  }, []);



  const handleCardClick = (post) => {
    if (
      user &&
      user.subscriptionExpiry &&
      new Date(user.subscriptionExpiry) > new Date()
    ) {
      // إذا كان الاشتراك ساريًا، ننقل المستخدم لصفحة التفاصيل
      navigate(`/BlogDetails/${post._id}`, { state: { article: post } });
    } else {
      // إذا كان الاشتراك منتهيًا أو غير موجود، نعرض رسالة تنبيه
      alert("please subscribe to access the content.");
      navigate("/SubscriptionCardDisplay")
    }
  };


 
  
  // Pagination calculations
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = posts.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(posts.length / articlesPerPage);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/98/34/65/98346536f127a24ec131589322a1a001.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-4">Stay Informed, Stay Safe</h1>
            <p className="text-lg mb-6">
              Understanding crime is the first step towards prevention. Explore our resources and empower yourself with knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex" style={{ width: "90%", margin: "0 auto" }}>
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gray-200 rounded-l">
          <div className="col-lg-4">
            <div className="bg-white shadow-sm rounded p-4 mb-4">
              <h5 className="font-bold mb-3" style={{ color: "#8b0d11" }}>
                Latest Crime News
              </h5>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid"
                    src="https://i.pinimg.com/736x/f9/04/07/f90407a76c446705e8557191afd2ee01.jpg"
                    alt="Crime News"
                    style={{ width: "30%" }}
                  />
                  <div className="ms-3">
                    <Link to="#" style={{ color: "#8b0d11" }}>
                      Shocking Murder Incident in Downtown...
                    </Link>
                    <small className="d-block text-muted">March 10, 2023</small>
                  </div>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid"
                    src="https://i.pinimg.com/736x/f9/7c/b1/f97cb11bea35baac156be9236a0dff76.jpg"
                    alt="Crime News"
                    style={{ width: "30%" }}
                  />
                  <div className="ms-3">
                    <Link to="#" style={{ color: "#8b0d11" }}>
                      Is Stress Taking Over Your Life? A Look into Recent Crimes...
                    </Link>
                    <small className="d-block text-muted">March 14, 2023</small>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow-sm rounded p-4 mb-4">
              <h5 className="font-bold mb-3" style={{ color: "#8b0d11" }}>
                Investigation Reports
              </h5>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid"
                    src="https://static.ffx.io/images/$zoom_1%2C$multiply_0.5223%2C$ratio_1.777778%2C$width_1187%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/e15900c94bc4901c64a6405571f97f0a15e2e732"
                    alt="Investigation Report"
                    style={{ width: "30%" }}
                  />
                  <div className="ms-3">
                    <Link to="#" style={{ color: "#8b0d11" }}>
                      Deep Dive into Local Crime Patterns...
                    </Link>
                    <small className="d-block text-muted">March 15, 2023</small>
                  </div>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid"
                    src="https://i.pinimg.com/736x/79/10/0d/79100d104b03dffe94e3f9942aac906c.jpg"
                    alt="Investigation Report"
                    style={{ width: "30%" }}
                  />
                  <div className="ms-3">
                    <Link to="#" style={{ color: "#8b0d11" }}>
                      Understanding the Rise in Cyber Crimes...
                    </Link>
                    <small className="d-block text-muted">March 16, 2023</small>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow-sm rounded p-4 mb-4">
              <h5 className="font-bold mb-3" style={{ color: "#8b0d11" }}>
                Crime Scene Photos
              </h5>
              <div className="d-flex flex-wrap">
                <img
                  className="img-fluid m-1"
                  src="https://i.pinimg.com/236x/36/7e/a6/367ea6a970a45194410ebe6dcb3e3a86.jpg"
                  alt="Crime Scene"
                  style={{ width: "30%" }}
                />
                <img
                  className="img-fluid m-1"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShN-A8Zirxiiy6peIUD7qzxsHpow3lpaeJXg&s"
                  alt="Crime Scene"
                  style={{ width: "30%" }}
                />
                <img
                  className="img-fluid m-1"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptRhdkiD7W8F4_eX5HEobTg9IwWBThnGrhw&s"
                  alt="Crime Scene"
                  style={{ width: "30%" }}
                />
              </div>
            </div>

            <div className="bg-white shadow-sm rounded p-4 mb-4">
              <h5 className="font-bold" style={{ color: "#8b0d11" }}>
                Newsletter
              </h5>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                    style={{ backgroundColor: "#ffffff", color: "#000" }}
                  />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: "#8b0d11", color: "#ffffff" }}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white p-4 rounded w-3/4">
          <h2 className="text-2xl font-bold text-white">Collections</h2>

          <div className="mt-6 space-y-12">
            {loading ? (
              <p>Loading articles...</p>
            ) : (
              currentArticles.map((post) => (
                <div
                  key={post._id}
                  onClick={() => handleCardClick(post)}
                  className="bg-white rounded-lg shadow-md overflow-hidden group relative"
                >
                  <Link to={`/blog/${post._id}`} state={{ article: post }} className="block">
                    <div className="absolute top-4 left-4 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
                      {post.date}
                    </div>
                    <img
                      alt={post.imageAlt}
                      src={post.imageSrc}
                      className="w-full h-64 object-cover group-hover:opacity-75"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-red-700">{post.name}</h3>
                      <p className="mt-2 text-gray-600">{post.description}</p>
                    </div>
                    <div className="p-6 pt-0 flex justify-between text-sm text-gray-600">
                      {post.tags &&
                        post.tags.map((tag) => (
                          <span key={tag} className="bg-red-700 text-white px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <nav className="mt-10 flex justify-center">
            <ul className="flex space-x-2">
              <li>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-300 text-black disabled:opacity-50"
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1 ? "bg-red-700 text-white" : "bg-gray-300 text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-300 text-black disabled:opacity-50"
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Blog;

