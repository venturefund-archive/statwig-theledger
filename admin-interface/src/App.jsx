import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Configuration from "./pages/org-admin/Configuration/Configuration";
import OrgDashboard from "./pages/org-admin/Dashboard/OrgDashboard";
import ProductList from "./pages/org-admin/ProductList/ProductList";
import Users from "./pages/org-admin/Users/Users";
import Dashboard from "./pages/statwig-admin/Dashboard/Dashboard";
import Locations from "./pages/statwig-admin/Locations/Locations";
import Organization from "./pages/statwig-admin/Organization/Organization";
import ViewUsers from "./pages/statwig-admin/ViewUsers/ViewUsers";
import OrgHeader from "./shared/OrgHeader/OrgHeader";
import StatwigHeader from "./shared/StatwigHeader/StatwigHeader";

export default function App() {
  const [AdminType, setAdminType] = useState("1");
  return (
    <BrowserRouter>
      {AdminType === "1" && (
        <>
          <StatwigHeader />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/statwig/manage-organization"
              element={<Organization />}
            />
            <Route path="/statwig/view-locations" element={<Locations />} />
            <Route path="/statwig/view-users" element={<ViewUsers />} />
          </Routes>
        </>
      )}
      {AdminType === "2" && (
        <>
          <OrgHeader />
          <Routes>
            <Route path="/" element={<OrgDashboard />} />
            <Route path="/org/manage-users" element={<Users />} />
            <Route path="/org/roles" element={<Configuration />} />
            <Route path="/org/product-list" element={<ProductList />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
