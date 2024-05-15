import { useState } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

function PaySlipEditor({
  isOpen,
  setIsOpen,
  unselectedSalaryComponents,
  setUnselectedSalaryComponents,
  paySlip,
  setPaySlip,
}) {
  console.log("PaySlip Editor Running");

  const salaryComponentSelect = useMutation({
    mutationFn: async (salaryComponentName) => {
      await moveFromUnselectedToSelected(salaryComponentName);
      await addCTC();
    },
  });

  const salaryComponentUnselect = useMutation({
    mutationFn: async (salaryComponent) => {
      await moveFromSelectedToUnselected(salaryComponent);
      await subtractCTC(salaryComponent);
    },
  });

  const salaryComponentCalculate = useMutation({
    mutationFn: async (basic) => {
      await calculateCTC(basic);
    },
  });

  const moveFromUnselectedToSelected = async (salaryComponentName) => {
    const response = await axios.get(
      `http://127.0.0.1:3000/app/salaryComponent/${salaryComponentName}`
    );

    console.log(
      "Status : " + response.status + " - Status Text : " + response.statusText
    );

    console.log(response.data[0]);

    // moveFromUnselectedToSelected(response.data[0]);
    console.log("Move From Unselected To Selected");

    let tempSelectedSalaryComponents = paySlip.salaryComponents;
    tempSelectedSalaryComponents.push(response.data[0]);

    let tempUnselectedSalaryComponents = unselectedSalaryComponents;
    tempUnselectedSalaryComponents.splice(
      tempUnselectedSalaryComponents.indexOf(response.data[0].name),
      1
    );

    console.log(tempSelectedSalaryComponents);
    console.log(tempUnselectedSalaryComponents);

    paySlip["salaryComponents"] = tempSelectedSalaryComponents;
    setPaySlip(paySlip);
    setUnselectedSalaryComponents(tempUnselectedSalaryComponents);
  };

  const moveFromSelectedToUnselected = async (salaryComponent) => {
    console.log("Move From Selected To Unselected");

    let tempUnselectedSalaryComponents = unselectedSalaryComponents;
    tempUnselectedSalaryComponents.push(salaryComponent.name);

    let tempSelectedSalaryComponents = paySlip.salaryComponents;
    tempSelectedSalaryComponents.splice(
      tempSelectedSalaryComponents.indexOf(salaryComponent),
      1
    );

    console.log(tempSelectedSalaryComponents);
    console.log(tempUnselectedSalaryComponents);

    paySlip["salaryComponents"] = tempSelectedSalaryComponents;
    setPaySlip(paySlip);
    setUnselectedSalaryComponents(tempUnselectedSalaryComponents);
  };

  const addCTC = async () => {
    console.log("Add Latest Component in CTC");
    console.log(paySlip.salaryComponents[paySlip.salaryComponents.length - 1]);
    console.log(paySlip.ctc);

    let tempCTC = paySlip.ctc;
    let latestSalaryComponent =
      paySlip.salaryComponents[paySlip.salaryComponents.length - 1];
    if (latestSalaryComponent.calculationType === "absolute")
      tempCTC = tempCTC + latestSalaryComponent.amount;
    else if (latestSalaryComponent.calculationType === "percentage")
      tempCTC = tempCTC + (latestSalaryComponent.amount * paySlip.basic) / 100;

    paySlip["ctc"] = tempCTC;
    console.log(paySlip);
    setPaySlip(paySlip);
  };

  const subtractCTC = async (salaryComponent) => {
    console.log("Subtract Latest Component in CTC");
    console.log(salaryComponent);

    let tempCTC = paySlip.ctc;
    let latestSalaryComponent = salaryComponent;
    if (latestSalaryComponent.calculationType === "absolute")
      tempCTC = tempCTC - latestSalaryComponent.amount;
    else if (latestSalaryComponent.calculationType === "percentage")
      tempCTC = tempCTC - (latestSalaryComponent.amount * paySlip.basic) / 100;

    paySlip["ctc"] = tempCTC;
    setPaySlip(paySlip);
  };

  const calculateCTC = async (basic) => {
    console.log("Add All Components in CTC from basic");

    paySlip["basic"] = Number(basic);

    let tempCTC = Number(basic);
    paySlip.salaryComponents?.map((salaryComponent) => {
      if (salaryComponent.calculationType === "absolute")
        tempCTC = tempCTC + salaryComponent.amount;
      if (salaryComponent.calculationType === "percentage")
        tempCTC = tempCTC + (salaryComponent.amount * basic) / 100;
    });

    paySlip["ctc"] = tempCTC;
    setPaySlip(paySlip);
    console.log(paySlip);
  };

  if (!isOpen) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div>
      <div>
        <hr />
        <p>PAYSLIP EDITOR</p>
      </div>
      <div>
        <div>
          <label htmlFor="profile">Profile </label>
          <input id="profile" value={paySlip.profile} disabled />
          <label htmlFor="basic"> Basics {" ($ per month) "}</label>
          <input
            id="basic"
            value={paySlip.basic}
            onChange={async (event) => {
              if (event.target.value < 0) return;
              salaryComponentCalculate.mutate(event.target.value);
            }}
          />
          <label htmlFor="ctc"> CTC </label>
          <input id="ctc" value={paySlip.ctc} disabled />
        </div>
        <br />
        <div>
          <label htmlFor="salaryComponentName">
            Available Salary Component Name{" "}
          </label>
          <select
            id="salaryComponentName"
            onChange={(event) => {
              if (event.target.value === "Select") return;
              salaryComponentSelect.mutate(event.target.value);
            }}
          >
            <option key="Select">Select</option>
            {unselectedSalaryComponents.map((salaryComponentName) => (
              <option key={salaryComponentName}>{salaryComponentName}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="selected-components">
            Selected Salary Components
          </label>
          <table id="selected-components">
            <thead>
              <tr>
                <th>Name</th>
                <th>Pay Type</th>
                <th>Calculation Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paySlip.salaryComponents.map((salaryComponent) => (
                <tr key={salaryComponent._id}>
                  <td>{salaryComponent.name}</td>
                  <td>{salaryComponent.payType}</td>
                  <td>{salaryComponent.calculationType}</td>
                  <td>{salaryComponent.amount}</td>
                  <td>
                    <button
                      onClick={() => {
                        salaryComponentUnselect.mutate(salaryComponent);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            console.log(paySlip);
            setIsOpen(false);
          }}
        >
          Save PaySlip
        </button>
      </div>
    </div>,
    document.getElementById("paySlipPopUp")
  );
}

export default PaySlipEditor;
