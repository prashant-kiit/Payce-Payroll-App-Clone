import { useEffect, useState, useCallback } from "react";

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
        <li>
          <ol></ol>
        </li>
      </div>
    </>
  );
}

export default EmployeeList;
