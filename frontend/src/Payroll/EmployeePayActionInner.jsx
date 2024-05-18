import { useState } from "react";

function EmployeePayActionInner({
  employeeIndex,
  salaryComponentIndex,
  employees,
  setEmployees,
  totalPayment,
  setTotalPayment,
}) {
  console.log("Employee Pay Action Inner Running");

  // initial variables
  const currentPaySlip = employees[employeeIndex]?.paySlip;
  const currentSalaryComponent =
    currentPaySlip?.salaryComponents[salaryComponentIndex];
  const currentCalculationType = currentSalaryComponent.calculationType;

  const [newCurrentAmount, setSalaryComponentAmount] = useState(
    currentSalaryComponent?.amount
  );

  return (
    <>
      <label htmlFor={currentSalaryComponent?.name}>
        {currentSalaryComponent?.name}
      </label>
      <br />
      <input
        id={currentSalaryComponent?.name}
        type="number"
        value={newCurrentAmount}
        onChange={(event) => {
          // amount changed
          const oldCurrentAmount = currentSalaryComponent.amount;
          const newCurrentAmount = (currentSalaryComponent.amount = Number(
            event.target.value
          ));

          // ctc changed
          const oldCurrentCTC = currentPaySlip.ctc;
          let newCurrentCTC = 0;
          if (currentCalculationType === "absolute") {
            newCurrentCTC =
              oldCurrentCTC + (newCurrentAmount - oldCurrentAmount);
          }
          if (currentCalculationType === "percentage") {
            newCurrentCTC =
              oldCurrentCTC +
              ((newCurrentAmount - oldCurrentAmount) * currentPaySlip.basic) /
                100;
          }
          currentPaySlip.ctc = newCurrentCTC;

          // totalAmount changed
          const newTotalPayment = totalPayment + newCurrentCTC - oldCurrentCTC;

          setSalaryComponentAmount(newCurrentAmount);
          // setEmployeeCTC(newCurrentCTC);
          setEmployees(employees);
          setTotalPayment(newTotalPayment);

          console.log(newCurrentCTC);
          console.log(employees);
        }}
      />
      <br />
    </>
  );
}

export default EmployeePayActionInner;
