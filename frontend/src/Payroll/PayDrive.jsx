import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";
import EmployeePayAction from "./EmployeePayAction";
import { useState } from "react";

function PayDrive() {
  console.log("Pay Drive Running");

  const [employees, setEmployees] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [payDay, setPayDay] = useState("");
  let index = 0;

  const payDriveGet = useQuery({
    queryKey: ["payDriveGet"],
    queryFn: async () => {
      return await getPayDrive();
    },
  });

  const getPayDrive = async () => {
    const response = await axios.get("http://127.0.0.1:3000/app/payDrive", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(response);

    setTotalPayment(response.data[0].totalPayment);
    setTotalEmployee(response.data[0].totalEmployee);
    setPayDay(response.data[0].payDay);
    setEmployees(response.data[0].employees);

    return response.data;
  };

  const payDrivePost = useMutation({
    mutationFn: async () => {
      await postPayDrive();
    },
  });

  const postPayDrive = async () => {
    console.log({
      totalPayment: totalPayment,
      totalEmployee: totalEmployee,
      payDay: payDay,
      employees: employees,
    });

    const response = await axios.post(
      "http://127.0.0.1:3000/app/payDrive",
      {
        totalPayment: totalPayment,
        totalEmployee: totalEmployee,
        payDay: payDay,
        employees: employees,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  };

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>PAY DRIVE</p>
      </div>
      {payDriveGet.data && (
        <div>
          <label htmlFor="totalPayment">Total Payment </label>
          <input
            type="number"
            id="totalPayment"
            value={totalPayment}
            disabled
          />
          <label htmlFor="totalEmployee"> Total Employee </label>
          <input
            type="number"
            id="totalEmployee"
            value={totalEmployee}
            disabled
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
      )}
      <label htmlFor="employees">Employees</label>
      <hr />
      <div>
        <table id="employees">
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
            {payDriveGet.data &&
              employees.map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.ctc}</td>
                  <td>
                    <EmployeePayAction
                      index={index++}
                      employees={employees}
                      setEmployees={(employees) => {
                        setEmployees(employees);
                      }}
                      totalEmployee={totalEmployee}
                      setTotalEmployee={(totalEmployee) => {
                        setTotalEmployee(totalEmployee);
                      }}
                      totalPayment={totalPayment}
                      setTotalPayment={(totalPayment) => {
                        setTotalPayment(totalPayment);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <div>
        <button
          onClick={() => {
            payDrivePost.mutate();
          }}
        >
          Submit
        </button>
        <br />
        {payDrivePost.isSuccess && <p>Successful</p>}
        {payDrivePost.isError && <p>Error {JSON.stringify(payDrive.error)}</p>}
      </div>
      <div>
        <br />
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}

export default PayDrive;
