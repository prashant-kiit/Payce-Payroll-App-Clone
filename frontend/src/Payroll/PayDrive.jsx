import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmployeePayActionOuter from "./EmployeePayActionOuter";

function PayDrive() {
  console.log("Pay Drive Running");

  const [employees, setEmployees] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [payDay, setPayDay] = useState("");
  const [isLock, setIsLock] = useState(false);
  let index = 0;

  const payDriveAndEmployeesGet = useQuery({
    queryKey: ["payDriveAndEmployeesGet"],
    queryFn: async () => {
      await getPayDrive();
      await getEmployees();
      return true;
    },
  });

  const getPayDrive = async () => {
    const response = await axios.get("http://127.0.0.1:3000/app/payDrive", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(response);

    console.log("PayDrive");
    console.log(response.data[0]);

    setTotalPayment(response.data[0].totalPayment);
    setTotalEmployee(response.data[0].totalEmployee);
    setPayDay(response.data[0].payDay);
  };

  const getEmployees = async () => {
    const response = await axios.get("http://127.0.0.1:3000/app/employees", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(response);

    console.log("Employees");
    console.log(response.data);

    setEmployees(response.data);
  };

  const payDriveAndEmployeesPost = useMutation({
    mutationFn: async () => {
      await postPayDrive();
      await putEmployees();
    },
  });

  const postPayDrive = async () => {
    console.log({
      totalPayment: totalPayment,
      totalEmployee: totalEmployee,
      payDay: payDay,
    });

    const response = await axios.post(
      "http://127.0.0.1:3000/app/payDrive",
      {
        totalPayment: totalPayment,
        totalEmployee: totalEmployee,
        payDay: payDay,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  };

  const putEmployees = async () => {
    console.log(employees);

    employees.map(async (employee) => {
      const response = await axios.put(
        `http://127.0.0.1:3000/app/employee/selected/${employee.empId}`,
        {
          paySlip: employee.paySlip,
          ctc: employee.paySlip.ctc,
          selected: employee.selected,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    });
  };

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>PAY DRIVE</p>
      </div>
      {payDriveAndEmployeesGet.data && (
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
          <br />
          <label htmlFor="payDay"> Pay Day </label>
          <input
            type="date"
            id="payDay"
            value={payDay}
            disabled={isLock}
            onChange={(event) => {
              setPayDay(event.target.value);
            }}
          />
          <button
            onClick={() => {
              setIsLock(!isLock);
            }}
          >
            {!isLock ? "Confirm PayDay" : "Unconfirm PayDay"}
          </button>
        </div>
      )}
      <hr />
      <label htmlFor="employees">Employees</label>
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
            {payDriveAndEmployeesGet.data &&
              employees.map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <EmployeePayActionOuter
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            if (!isLock) alert("Pay Day Confirmation is Mandatory");
            else payDriveAndEmployeesPost.mutate();
          }}
        >
          Submit
        </button>
        <br />
        {payDriveAndEmployeesPost.isPending && <p>Submitting...</p>}
        {payDriveAndEmployeesPost.isSuccess && <p>Successfully Submitted</p>}
        {payDriveAndEmployeesPost.isError && (
          <p>Error {JSON.stringify(payDriveAndEmployeesPost.error)}</p>
        )}
      </div>
      <div>
        <br />
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}

export default PayDrive;
