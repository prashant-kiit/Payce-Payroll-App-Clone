import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [designation, setDesignation] = useState("");
  const [doj, setDOJ] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ctc, setCTC] = useState("");

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
        alert(
          "Status : " +
            response.status +
            " - " +
            response.statusText +
            " - " +
            data.data
        );
        throw new Error(
          response.status + " - " + response.statusText + " - " + data.data
        );
      }

      setEmployees(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  }, [employees]);

  const deleteEmployee = useCallback(
    async (empId) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:3000/app/employee/${empId}`
        );

        console.log("DELETE request successful");
        console.log(
          "Status : " +
            response.request.status +
            " - Status Text : " +
            response.request.statusText +
            " - Body : " +
            response.data.data
        );
      } catch (error) {
        console.log("Client Error");
        console.log(error);
        alert(
          "Status : " +
            error.request.status +
            " - Status Text : " +
            error.request.statusText +
            " - Body : " +
            error.response.data.data +
            " - Message : " +
            error.message
        );
      }
    },
    [empId]
  );

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
            <tr key={"headerFilter"}>
              <th key={"idheaderFilter"}>
                <select
                  type="text"
                  key={"idheaderFilterSelect"}
                  value={empId}
                  onChange={(e) => {
                    setEmpId(e.target.value);
                  }}
                >
                  {employees.map((employee) => (
                    <option key={employee.empId} value={employee.empId}>
                      {employee.empId}
                    </option>
                  ))}
                </select>
              </th>
              <th key={"nameheaderFilter"}>
                <select
                  type="text"
                  key={"nameheaderFilterSelect"}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                >
                  {employees.map((employee) => (
                    <option key={employee.empId} value={employee.name}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </th>
              <th key={"desiheaderFilter"}>
                <select
                  type="text"
                  key={"desiheaderFilterSelect"}
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                >
                  {employees.map((employee) => (
                    <option key={employee.empId} value={employee.designation}>
                      {employee.designation}
                    </option>
                  ))}
                </select>
              </th>
              <th key={"deptheaderFilter"}>
                <select
                  type="text"
                  key={"deptheaderFilterSelect"}
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  {employees.map((employee) => (
                    <option key={employee.empId} value={employee.department}>
                      {employee.department}
                    </option>
                  ))}
                </select>
              </th>
              <th key={"emailheaderFilter"}>
                <select
                  type="text"
                  key={"emailheaderFilterSelect"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                >
                  {employees.map((employee) => (
                    <option key={employee.empId} value={employee.email}>
                      {employee.email}
                    </option>
                  ))}
                </select>
              </th>
              <th key={"ctcheaderFilter"}>
                <select
                  type="text"
                  key={"ctcheaderFilterSelect"}
                  value={ctc}
                  onChange={(e) => {
                    setCTC(e.target.value);
                  }}
                >
                  {employees.map((employee) => (
                    <option key={employee.empId} value={employee.ctc}>
                      {employee.ctc}
                    </option>
                  ))}
                </select>
              </th>
              <th key={"buttonheaderFilter"}>
                <button>Filter</button>
              </th>
            </tr>
            {employees.map((employee) => (
              <tr key={`row${employee.empId}`}>
                <td key={`id${employee.empId}`}>
                  {" "}
                  <NavLink
                    key={`navlink${employee.empId}`}
                    to={`/employees/${employee.empId}`}
                  >
                    {employee.empId}
                  </NavLink>
                </td>
                <td key={`name${employee.empId}`}>{employee.name}</td>
                <td key={`desi${employee.empId}`}>{employee.designation}</td>
                <td key={`dept${employee.empId}`}>{employee.department}</td>
                <td key={`email${employee.empId}`}>{employee.email}</td>
                <td key={`ctc${employee.empId}`}>${employee.ctc} per year</td>
                <td key={`action${employee.empId}`}>
                  <button
                    key={`delete${employee.empId}`}
                    onClick={async () => {
                      await deleteEmployee(employee.empId);
                      // window.location.reload();
                    }}
                  >
                    Delete
                  </button>
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
