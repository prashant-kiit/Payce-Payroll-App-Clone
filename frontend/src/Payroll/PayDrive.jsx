import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";
import EmployeePayAction from "./EmployeePayAction";
import { useState } from "react";

function PayDrive() {
  console.log("Pay Drive Running");

  const [totalPayment, setTotalPayment] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [payDay, setPayDay] = useState();

  const selectedEmployees = useQuery({
    queryKey: ["selectedEmployees"],
    queryFn: async () => {
      return await getSelectedEmployees();
    },
  });

  const getSelectedEmployees = async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/app/selectedEmployees",
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(response);
    console.log(response.data.length);

    setTotalEmployee(response.data.length);

    return response.data;
  };

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>PAY DRIVE</p>
      </div>
      <div>
        <label htmlFor="totalPayment">Total Payment </label>
        <input
          type="number"
          id="totalPayment"
          value={totalPayment}
          disabled
          onChange={(event) => {
            setTotalPayment(event.target.value);
          }}
        />
        <label htmlFor="totalEmployee"> Total Employee </label>
        <input
          type="number"
          id="totalEmployee"
          value={totalEmployee}
          disabled
          onChange={(event) => {
            setTotalEmployee(event.target.value);
          }}
        />
        <label htmlFor="payDay"> Pay Day </label>
        <input
          type="date"
          id="payDay"
          value={payDay}
          onChange={(event) => {
            setPayDay(event.target.value);
          }}
        />
      </div>
      <hr />
      <div>
        <label htmlFor="selectedEmployee">Selected Employee</label>
        <table id="selectedEmployee">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Cost to Company </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedEmployees.data &&
              selectedEmployees.data.map((selectedEmployee) => (
                <tr key={selectedEmployee.empId}>
                  <td>{selectedEmployee.empId}</td>
                  <td>{selectedEmployee.name}</td>
                  <td>{selectedEmployee.designation}</td>
                  <td>{selectedEmployee.ctc}</td>
                  <td>
                    <EmployeePayAction
                      employee={selectedEmployee}
                      totalEmployee={totalEmployee}
                      setTotalEmployee={(totalEmployee) => {
                        setTotalEmployee(totalEmployee);
                      }}
                      totalPayment={totalPayment}
                      setTotalPayment={(totalPayment) => {
                        setTotalEmployee(totalPayment);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <br />
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}

export default PayDrive;
