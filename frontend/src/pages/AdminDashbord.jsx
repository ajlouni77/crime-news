import Overview from "../Component/AdminDashbord/overview";
import SubscriptionCardForm from "../Component/AdminDashbord/SubscriptionCardForm";
import FormDetails from "../Component/AdminDashbord/ArticalCards";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import PostDashboard from "./Subscription/Post";

function AdminDashbord() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/articlescards" element={<FormDetails />} />
        <Route path="/subform" element={<SubscriptionCardForm />} />
        <Route path="/postform" element={<PostDashboard />} />
      </Routes>
    </>
  );
}

export default AdminDashbord;
