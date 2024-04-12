import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import EmployeeAdder from "./EmployeeAdder";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      console.log("response");
      console.log(response);

      const data = await response.json();
      console.log("data");
      console.log(data);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setEmployees(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  });

  return (
    <>
      <div>
        <h2>Payroll App</h2>
        <p>EMPLOYEE LIST</p>
      </div>
      <div>
        <NavLink to="/employees/add">Add Employee</NavLink>
      </div>
      <br />
      <div>
        <table key={"emptable"}>
          <tbody>
            <tr key={"header"}>
              <th key={"idheader"}>Emp Id</th>
              <th key={"nameheader"}>Name</th>
              <th key={"desiheader"}>Designation</th>
              <th key={"deptheader"}>Department</th>
              <th key={"emailheader"}>Email</th>
              <th key={"ctcheader"}>Cost To Company</th>
              <th key={"buttonheader"}>Action</th>
            </tr>
            {employees.map((employee) => (
              <tr key={`row${employee.empId}`}>
                <td key={`id${employee.empId}`}>{employee.empId}</td>
                <td key={`name${employee.empId}`}>{employee.name}</td>
                <td key={`desi${employee.empId}`}>{employee.designation}</td>
                <td key={`dept${employee.empId}`}>{employee.department}</td>
                <td key={`email${employee.empId}`}>{employee.email}</td>
                <td key={`ctc${employee.empId}`}>${employee.ctc} per year</td>
                <td key={`action${employee.empId}`}>
                  <NavLink
                    key={`navlink${employee.empId}`}
                    to={`/employees/${employee.empId}`}
                  >
                    Edit
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <br />
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
