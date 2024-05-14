import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function EmployeePayAction({
  index,
  employees,
  setEmployees,
  totalEmployee,
  setTotalEmployee,
  totalPayment,
  setTotalPayment,
}) {
  console.log("Employee Pay Action Running");

  const [selected, setSelected] = useState(employees[index].selected);

  return (
    <>
      <input
        type="checkbox"
        checked={selected}
        onChange={(event) => {
          console.log(
            `${employees[index].name}(${employees[index].empId}) : ${employees[index].ctc} = ${event.target.checked}`
          );

          if (event.target.checked) {
            setTotalPayment(totalPayment + employees[index].ctc);
            setTotalEmployee(totalEmployee + 1);
          }

          if (!event.target.checked) {
            setTotalPayment(totalPayment - employees[index].ctc);
            setTotalEmployee(totalEmployee - 1);
          }

          employees[index].selected = event.target.checked;
          setEmployees(employees);

          setSelected(employees[index].selected);

          console.log(employees);
        }}
      />
    </>
  );
}

export default EmployeePayAction;
