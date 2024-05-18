import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import EmployeePayActionInner from "./EmployeePayActionInner";

function EmployeePayActionOuter({
  index,
  employees,
  setEmployees,
  totalEmployee,
  setTotalEmployee,
  totalPayment,
  setTotalPayment,
}) {
  console.log("Employee Pay Action Outer Running");

  const [selected, setSelected] = useState(employees[index].selected);
  const [isOpen, setIsOpen] = useState(false);
  let salaryComponentIndex = 0;

  return (
    <>
      <td>$ {employees[index].paySlip.ctc} per month</td>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => {
            if (event.target.checked) {
              setTotalPayment(totalPayment + employees[index].paySlip.ctc);
              setTotalEmployee(totalEmployee + 1);
            }

            if (!event.target.checked) {
              setTotalPayment(totalPayment - employees[index].paySlip.ctc);
              setTotalEmployee(totalEmployee - 1);
            }

            employees[index].selected = event.target.checked;

            setEmployees(employees);
            setSelected(employees[index].selected);

            console.log(employees);
          }}
        />
        <br />
        <button
          disabled={!selected}
          onClick={() => {
            console.log(employees[index].empId);
            let count = 0;
            employees[index].paySlip.salaryComponents.map((salaryComponent) => {
              if (salaryComponent.payType === "variable") {
                console.log(salaryComponent.name);
                count++;
              }
            });
            if (count === 0) alert("No variable components are available");
            else setIsOpen(!isOpen);
          }}
        >
          {!isOpen ? "Set Variables" : "Save Variables"}
        </button>
        {isOpen && (
          <div>
            {employees[index].paySlip.salaryComponents.map(
              (salaryComponent) => {
                if (salaryComponent.payType === "variable")
                  return (
                    <EmployeePayActionInner
                      key={salaryComponentIndex}
                      employeeIndex={index}
                      salaryComponentIndex={salaryComponentIndex++}
                      employees={employees}
                      setEmployees={(employee) => {
                        setEmployees(employee);
                      }}
                      totalPayment={totalPayment}
                      setTotalPayment={(totalPayment) => {
                        setTotalPayment(totalPayment);
                      }}
                    />
                  );
                salaryComponentIndex++;
              }
            )}
          </div>
        )}
        <hr />
      </td>
    </>
  );
}

export default EmployeePayActionOuter;
