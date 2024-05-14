import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function EmployeePayAction({
  employee,
  totalEmployee,
  setTotalEmployee,
  totalPayment,
  setTotalPayment,
}) {
  console.log("Employee Pay Action Running");

  const [checked, setChecked] = useState(true);

  const employeeSelect = useMutation({
    mutationFn: async (ctc) => {
      await postEmployee();
    },
    onSuccess: (variables) => {
      // console.log(variables.ctc);
      console.log(!checked);
      setChecked(!checked);
      setTotalEmployee(totalEmployee + 1);
    },
  });

  const employeeUnSelect = useMutation({
    mutationFn: async (ctc) => {
      await deleteEmployee();
    },
    onSuccess: (variables) => {
      // console.log(variables.ctc);
      console.log(!checked);
      setChecked(!checked);
      setTotalEmployee(totalEmployee - 1);
    },
  });

  const postEmployee = async () => {
    const response = await axios.post(
      "http://127.0.0.1:3000/app/selectedEmployee",
      {
        empId: employee.empId,
        ctc: employee.ctc,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  };

  const deleteEmployee = async () => {
    const response = await axios.delete(
      `http://127.0.0.1:3000/app/selectedEmployee/${employee.empId}`,
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
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          console.log(
            `${employee.name}(${employee.empId}) : ${employee.ctc} = ${event.target.checked}`
          );
          if (!checked) employeeSelect.mutate({ ctc: employee.ctc });
          else employeeUnSelect.mutate({ ctc: employee.ctc });
        }}
      />
    </div>
  );
}

export default EmployeePayAction;
