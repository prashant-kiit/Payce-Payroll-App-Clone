import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmployeePayActionOuter from "./EmployeePayActionOuter";

const monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getNextPayDay(submittedPayDay) {
  const date = new Date(submittedPayDay);
  date.setDate(date.getDate() + monthDayCount[date.getMonth() + 1]);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function PayDrive() {
  console.log("Pay Drive Running");

  const [totalPayment, setTotalPayment] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [payDay, setPayDay] = useState("");
  const [status, setStatus] = useState("");
  const [employees, setEmployees] = useState([]);
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

    console.log(response.data[0]);

    setTotalPayment(response.data[0].totalPayment);
    setTotalEmployee(response.data[0].totalEmployee);
    setStatus(response.data[0].paid);
    if (response.data[0].paid) {
      setPayDay(getNextPayDay(response.data[0].payDay));
      setStatus("Unscheduled");
    } else {
      setPayDay(response.data[0].payDay);
      setStatus("Scheduled on " + response.data[0].payDay);
    }
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
      await postPayDriveScheduler();
    },
  });

  const postPayDrive = async () => {
    // console.log({
    //   totalPayment: totalPayment,
    //   totalEmployee: totalEmployee,
    //   payDay: payDay,
    //   paid: false,
    // });

    const response = await axios.post(
      "http://127.0.0.1:3000/app/payDrive",
      {
        totalPayment: totalPayment,
        totalEmployee: totalEmployee,
        payDay: payDay,
        paid: false,
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
    // console.log(employees);

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

  const postPayDriveScheduler = async () => {
    const response = await axios.post(
      "http://127.0.0.1:3000/app/payDriveScheduler",
      { cmd: "node paySlipGeneratorClient.js" },
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
          <label htmlFor="payDay"> Next Pay Day </label>
          <input
            type="date"
            id="payDay"
            value={payDay}
            onChange={(event) => {
              const selectedDate = new Date(event.target.value);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              if (selectedDate >= currentDate) setPayDay(event.target.value);
              else
                alert(
                  "Select a date that is equal to or greater than today's date"
                );
            }}
          />
          <label htmlFor="status"> Drive Status </label>
          <input type="text" id="status" value={status} disabled />
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
            payDriveAndEmployeesPost.mutate();
            setStatus("Scheduled on " + payDay);
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
