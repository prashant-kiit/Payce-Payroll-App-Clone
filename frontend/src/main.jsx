import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Organization from "./Payroll/Organization.jsx";
import EmployeeAdder from "./Payroll/EmployeeAdder.jsx";
import EmployeeList from "./Payroll/EmployeeList.jsx";
import PayStructure from "./Payroll/PayStructure.jsx";
import EmployeeEditor from "./Payroll/EmployeeEditor.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="" element={<EmployeeList />} />
//       <Route path=":empId" element={<EmployeeAdder />} />
//       <Route path="*" element={<div>Not Found</div>} />
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <EmployeeEditor empId="566722" />
  //</React.StrictMode>,
);
