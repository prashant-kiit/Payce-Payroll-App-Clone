import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "./Payroll/Home.jsx";
import Organization from "./Payroll/Organization.jsx";
import EmployeeList from "./Payroll/EmployeeList.jsx";
import EmployeeAdder from "./Payroll/EmployeeAdder.jsx";
import EmployeeEditor from "./Payroll/EmployeeEditor.jsx";
import PayStructure from "./Payroll/PayStructure.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="organization" element={<Organization />} />
      <Route path="employees/">
        <Route path="" element={<EmployeeList />} />
        <Route path=":empId" element={<EmployeeEditor />} />
        <Route path="add" element={<EmployeeAdder />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  // <EmployeeEditor />
  //</React.StrictMode>,
);
