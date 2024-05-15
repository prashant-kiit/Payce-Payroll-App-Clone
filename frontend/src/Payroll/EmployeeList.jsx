import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function EmployeeList() {
  // all employees
  const [employees, setEmployees] = useState([]);
  // all employees details (unique)
  const [empIds, setEmpIds] = useState([]);
  const [names, setNames] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [emails, setEmails] = useState([]);
  // filter condition
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [minCTC, setMinCTC] = useState("");
  const [maxCTC, setMaxCTC] = useState("");
  // const [ctc, setCTC] = useState("");
  // filter trigger
  const [filterTrigger, setFilterTrigger] = useState(0);

  useEffect(() => {
    (async () => {
      await getEmployees();
    })();
  }, [filterTrigger]);

  const getEmployees = async () => {
    const url = "http://127.0.0.1:3000/app/employees";
    const queryString = `empId=${empId}&name=${name}&designation=${designation}&department=${department}&email=${email}&minCTC=${minCTC}&maxCTC=${maxCTC}`;
    console.log("Filter Criteria");
    console.log(empId);
    console.log(name);
    console.log(designation);
    console.log(department);
    console.log(email);
    console.log(minCTC);
    console.log(maxCTC);
    try {
      const response = await fetch(url + "?" + queryString, {
        // ?
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
      let empIdsSet = new Set();
      let empIdsArray = [];
      let namesSet = new Set();
      let namesArray = [];
      let designationsSet = new Set();
      let designationsArray = [];
      let departmentsSet = new Set();
      let departmentsArray = [];
      let emailsSet = new Set();
      let emailsArray = [];
      data.map((employee) => {
        if (!empIdsSet.has(employee.empId)) {
          empIdsArray.push(employee.empId);
          empIdsSet.add(employee.empId);
        }
        if (!namesSet.has(employee.name)) {
          namesArray.push(employee.name);
          namesSet.add(employee.name);
        }
        if (!designationsSet.has(employee.designation)) {
          designationsArray.push(employee.designation);
          designationsSet.add(employee.designation);
        }
        if (!departmentsSet.has(employee.department)) {
          departmentsArray.push(employee.department);
          departmentsSet.add(employee.department);
        }
        if (!emailsSet.has(employee.email)) {
          emailsArray.push(employee.email);
          emailsSet.add(employee.email);
        }
      });

      setEmpIds(empIdsArray);
      setNames(namesArray);
      setDesignations(designationsArray);
      setDepartments(departmentsArray);
      setEmails(emailsArray);
      console.log(empIdsArray);
      console.log(namesArray);
      console.log(designationsArray);
      console.log(departmentsArray);
      console.log(emailsArray);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

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
                  <option></option>
                  {empIds.map((empId) => (
                    <option key={empId} value={empId}>
                      {empId}
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
                  <option></option>
                  {names.map((name) => (
                    <option key={name} value={name}>
                      {name}
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
                  <option></option>
                  {designations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
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
                  <option></option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
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
                  <option></option>
                  {emails.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </th>
              <th key={"ctcheaderFilter"}>
                <input
                  type="number"
                  key="minctc"
                  value={minCTC}
                  onChange={(e) => {
                    if (/^\d+$/.test(e.target.value)) {
                      setMinCTC(Number(e.target.value));
                    } else if (e.target.value === "") {
                      setMinCTC(e.target.value);
                    } else {
                      alert("Only Postive Numbers are allowed");
                    }
                  }}
                />
                <br />
                <input
                  type="number"
                  key="maxctc"
                  value={maxCTC}
                  onChange={(e) => {
                    if (/^\d+$/.test(e.target.value)) {
                      setMaxCTC(Number(e.target.value));
                    } else if (e.target.value === "") {
                      setMaxCTC(e.target.value);
                    } else {
                      alert("Only Postive Numbers are allowed");
                    }
                  }}
                />
              </th>
              <th key={"buttonheaderFilterClear"}>
                <button
                  key="filterbutton"
                  onClick={() => {
                    setFilterTrigger(filterTrigger + 1);
                  }}
                >
                  Filter
                </button>
                <br />
                <button
                  key="clearbutton"
                  onClick={() => {
                    setEmpId("");
                    setName("");
                    setDepartment("");
                    setDesignation("");
                    setEmail("");
                    setMinCTC("");
                    setMaxCTC("");
                    window.location.reload();
                  }}
                >
                  Clear
                </button>
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
                <td key={`ctc${employee.empId}`}>${employee.ctc} per month</td>
                <td key={`action${employee.empId}`}>
                  <button
                    key={`delete${employee.empId}`}
                    onClick={async () => {
                      await deleteEmployee(employee.empId);
                      window.location.reload();
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
