import React from "react";
import ReactDOM from "react-dom/client";
import Organization from "./Payroll/Organization.jsx";
import EmployeeAdder from "./Payroll/EmployeeAdder.jsx";
import EmployeeList from "./Payroll/EmployeeList.jsx";
import PayStructure from "./Payroll/PayStructure.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <EmployeeList />
  //</React.StrictMode>,
);
