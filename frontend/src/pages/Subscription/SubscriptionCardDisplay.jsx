

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SubscriptionCard = ({ plan }) => {
  return (
    <div className="bg-screen-dark text-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 animate-fadeIn">
      <div className="p-6 border-b border-screen-red">
        <h3 className="text-2xl font-bold text-screen-red">{plan.title}</h3>
        <p className="mt-2 text-sm">{plan.description}</p>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-screen-red">{plan.price}</span>
          <span className="text-sm text-gray-300">{plan.duration}</span>
        </div>
        <ul className="mt-4 space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-screen-red rounded-full inline-block mr-2"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
            to="/payment"
            state={{
              id: plan._id,
              title: plan.title,
              price: plan.price,
              duration: plan.duration,
              features: plan.features,
            }}
            className="relative group inline-block w-full py-4 px-6 text-center text-gray-300 hover:text-gray-50 font-semibold rounded-full overflow-hidden transition duration-200"
          >
        <button className="mt-6 w-full py-2 bg-screen-red hover:bg-opacity-80 transition duration-300 rounded">
          Subscribe Now
        </button></Link>
      </div>
    </div>
  );
};

const SubscriptionCardDisplay = () => {
  const { t } = useTranslation();
  const [subscriptionCards, setSubscriptionCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch("http://localhost:5000/api/subscription")
      .then((res) => res.json())
      .then((data) => {
        setSubscriptionCards(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subscription cards:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">{t("Loading...")}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-white">
      <h1 className="text-3xl font-bold text-screen-red mb-8 animate-bounce">
        {t("exclusivePlans")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {subscriptionCards.map((card) => (
          <SubscriptionCard key={card._id} plan={card} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCardDisplay;




// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";

// import { Link } from "react-router-dom";

// const SubscriptionCard = ({ plan }) => {
  
//   return (
//     <div className="w-full px-4 mb-8 lg:mb-0 mx-auto max-w-[380px]">
//       <div className="max-w-sm lg:max-w-none mx-auto pt-10 px-10 pb-8 bg-gray-100 rounded-3xl">
//         <div className="text-center mb-6">
//           <h5 className="text-2xl font-semibold text-gray-800 mb-3">{plan.title}</h5>
//           <span className="block text-5xl font-bold text-gray-800 mb-3">{plan.price}</span>
//           <span className="block text-gray-600 font-medium mb-6">{plan.duration}</span>
//           <Link
//             to="/payment"
//             state={{
//               id: plan._id,
//               title: plan.title,
//               price: plan.price,
//               duration: plan.duration,
//               features: plan.features,
//             }}
//             className="relative group inline-block w-full py-4 px-6 text-center text-gray-800 hover:text-gray-50 bg-yellow-300 font-semibold rounded-full overflow-hidden transition duration-200"
//           >
//             <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500" />
//             <span className="relative">Subscribe Now</span>
//           </Link>
//         </div>
//         <ul>
//           {plan.features.map((feature, index) => (
//             <li key={index} className="flex mb-4 items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 className="w-6 h-6 fill-current text-gray-800"
//               >
//                 <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
//               </svg>
//               <span className="ml-2 text-gray-800">{feature}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );

// }
// const SubscriptionCardDisplay = () => {
//   const { t } = useTranslation();
//   const [subscriptionCards, setSubscriptionCards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/subscription")
//       .then((res) => res.json())
//       .then((data) => {
//         setSubscriptionCards(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching subscription cards:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         {t("Loading...")}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center p-4">
//       <h1 className="text-3xl font-bold text-screen-red mb-8 animate-bounce">
//         {t("exclusivePlans")}
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
//         {subscriptionCards.map((card) => (
//           <SubscriptionCard key={card._id} plan={card} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionCardDisplay;

