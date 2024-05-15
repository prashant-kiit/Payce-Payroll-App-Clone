import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../Layout.jsx";
import Home from "./Payroll/Home.jsx";
import Organization from "./Payroll/Organization.jsx";
import EmployeeList from "./Payroll/EmployeeList.jsx";
import EmployeeAdder from "./Payroll/EmployeeAdder.jsx";
import EmployeeEditor from "./Payroll/EmployeeEditor.jsx";
import SalaryComponentAdder from "./Payroll/SalaryComponentAdder.jsx";
import SalaryComponentList from "./Payroll/SalaryComponentList.jsx";
import SalaryComponentEditor from "./Payroll/SalaryComponentEditor.jsx";
import SalaryTemplateAdder from "./Payroll/SalaryTemplateAdder.jsx";
import SalaryTemplateList from "./Payroll/SalaryTemplateList.jsx";
import SalaryTemplateEditor from "./Payroll/SalaryTemplateEditor.jsx";
import PayHome from "./Payroll/PayHome.jsx";
import PayDrive from "./Payroll/PayDrive.jsx";
import PayHistory from "./Payroll/PayHistory.jsx";
import PaySlipEditor from "./Payroll/PaySlipEditor.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="organization" element={<Organization />} />
      <Route path="employees/">
        <Route path="" element={<EmployeeList />} />
        <Route path=":empId" element={<EmployeeEditor />} />
        <Route path="add" element={<EmployeeAdder />} />
        <Route path="paySlip/">
          <Route path=":profile" element={<PaySlipEditor />} />
        </Route>
      </Route>
      <Route path="salaryComponents/">
        <Route path="" element={<SalaryComponentList />} />
        <Route path=":name" element={<SalaryComponentEditor />} />
        <Route path="add" element={<SalaryComponentAdder />} />
      </Route>
      <Route path="salaryTemplates/">
        <Route path="" element={<SalaryTemplateList />} />
        <Route path=":profile/" element={<SalaryTemplateEditor />} />
        <Route path="add" element={<SalaryTemplateAdder />} />
      </Route>
      <Route path="payHome/">
        <Route path="" element={<PayHome />} />
        <Route path="drive" element={<PayDrive />} />
        <Route path="history" element={<PayHistory />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  // <SalaryComponent />
  //</React.StrictMode>,
);
