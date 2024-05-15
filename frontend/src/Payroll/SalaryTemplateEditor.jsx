import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function SalaryTemplateEditor() {
  console.log("SalaryTemplateEditor Running");
  const { profile } = useParams();
  const [basic, setBasic] = useState(0);
  const [ctc, setCTC] = useState(0);
  const [selectedSalaryComponents, setSelectedSalaryComponents] = useState([]);
  const [unselectedSalaryComponents, setUnselectedSalaryComponents] = useState(
    []
  );

  const salaryTemplate = useQuery({
    queryKey: ["salaryTemplate", profile],
    queryFn: async () => {
      return await getSalaryTemplate();
    },
  });

  const salaryComponentNames = useQuery({
    queryKey: ["salaryComponentNames"],
    enabled: salaryTemplate?.data != null,
    queryFn: async () => {
      return await getSalaryComponentNames();
    },
  });

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

  const salaryTemplatePut = useMutation({
    mutationFn: async () => {
      await putSalaryTemplate();
    },
  });

  const getSalaryTemplate = async () => {
    const response = await axios.get(
      `http://127.0.0.1:3000/app/salaryTemplate/${profile}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    setBasic(response.data[0].basic);
    setCTC(response.data[0].ctc);
    setSelectedSalaryComponents(response.data[0].salaryComponents);

    return response.data[0];
  };

  const getSalaryComponentNames = async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/app/salaryComponentNames",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    console.log("__");
    console.log(response.data);

    let tempSalaryComponentNames = [];
    salaryTemplate?.data?.salaryComponents?.map((salaryComponent) => {
      tempSalaryComponentNames.push(salaryComponent.name);
    });
    console.log(tempSalaryComponentNames);

    let tempUnselectedSalaryComponent = [];
    response.data.map((name) => {
      if (!tempSalaryComponentNames?.includes(name))
        tempUnselectedSalaryComponent.push(name);
    });
    console.log(tempUnselectedSalaryComponent);
    console.log("__");

    setUnselectedSalaryComponents(tempUnselectedSalaryComponent);

    return response.data;
  };

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

    let tempSelectedSalaryComponents = selectedSalaryComponents;
    tempSelectedSalaryComponents.push(response.data[0]);

    let tempUnselectedSalaryComponents = unselectedSalaryComponents;
    tempUnselectedSalaryComponents.splice(
      tempUnselectedSalaryComponents.indexOf(response.data[0].name),
      1
    );

    console.log(tempSelectedSalaryComponents);
    console.log(tempUnselectedSalaryComponents);

    setSelectedSalaryComponents(tempSelectedSalaryComponents);
    setUnselectedSalaryComponents(tempUnselectedSalaryComponents);
  };

  const moveFromSelectedToUnselected = async (salaryComponent) => {
    console.log("Move From Selected To Unselected");

    let tempUnselectedSalaryComponents = unselectedSalaryComponents;
    tempUnselectedSalaryComponents.push(salaryComponent.name);

    let tempSelectedSalaryComponents = selectedSalaryComponents;
    tempSelectedSalaryComponents.splice(
      tempSelectedSalaryComponents.indexOf(salaryComponent),
      1
    );

    console.log(tempSelectedSalaryComponents);
    console.log(tempUnselectedSalaryComponents);

    setSelectedSalaryComponents(tempSelectedSalaryComponents);
    setUnselectedSalaryComponents(tempUnselectedSalaryComponents);
  };

  const addCTC = async () => {
    console.log("Add Latest Component in CTC");
    console.log(selectedSalaryComponents[selectedSalaryComponents.length - 1]);

    let tempCTC = ctc;
    let latestSalaryComponent =
      selectedSalaryComponents[selectedSalaryComponents.length - 1];
    if (latestSalaryComponent.calculationType === "absolute")
      tempCTC = tempCTC + latestSalaryComponent.amount;
    else if (latestSalaryComponent.calculationType === "percentage")
      tempCTC = tempCTC + (latestSalaryComponent.amount * basic) / 100;

    setCTC(tempCTC);
  };

  const subtractCTC = async (salaryComponent) => {
    console.log("Subtract Latest Component in CTC");
    console.log(salaryComponent);

    let tempCTC = ctc;
    let latestSalaryComponent = salaryComponent;
    if (latestSalaryComponent.calculationType === "absolute")
      tempCTC = tempCTC - latestSalaryComponent.amount;
    else if (latestSalaryComponent.calculationType === "percentage")
      tempCTC = tempCTC - (latestSalaryComponent.amount * basic) / 100;

    setCTC(tempCTC);
  };

  const calculateCTC = async (basic) => {
    console.log("Add All Components in CTC from basic");
    console.log(basic);
    console.log(selectedSalaryComponents);

    let tempCTC = Number(basic);

    selectedSalaryComponents.map((salaryComponent) => {
      if (salaryComponent.calculationType === "absolute")
        tempCTC = tempCTC + salaryComponent.amount;
      if (salaryComponent.calculationType === "percentage")
        tempCTC = tempCTC + (salaryComponent.amount * basic) / 100;
    });

    setCTC(tempCTC);
  };

  const putSalaryTemplate = async () => {
    const response = await axios.put(
      "http://127.0.0.1:3000/app/salaryTemplate",
      {
        profile: profile,
        basic: basic,
        ctc: ctc,
        salaryComponents: selectedSalaryComponents,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  };

  if (salaryTemplatePut.isError) {
    return (
      <div>
        <p>Error : {JSON.stringify(salaryTemplatePut.error)}</p>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </button>
      </div>
    );
  }

  if (salaryTemplatePut.isSuccess) {
    return (
      <div>
        <p>Salary Template Edited Successfully</p>
        <NavLink to="/salaryTemplates">Salary Template List</NavLink>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>SALARY TEMPLATE EDITOR</p>
      </div>
      {salaryTemplate?.data && (
        <div>
          <label htmlFor="profile">Profile </label>
          <input id="profile" defaultValue={profile} disabled />
          <label htmlFor="basic"> Basics {" ($ per month) "}</label>
          <input
            id="basic"
            value={basic}
            onChange={async (event) => {
              if (event.target.value < 0) return;
              setBasic(event.target.value);
              await calculateCTC(event.target.value);
            }}
          />
          <label htmlFor="ctc"> CTC </label>
          <input id="ctc" value={ctc} disabled />
        </div>
      )}
      <hr />
      <div>
        <label htmlFor="salaryComponentName">
          Available Salary Component Name{" "}
        </label>
        <select
          id="salaryComponentName"
          onChange={(event) => {
            // console.log(event.target.value);
            if (event.target.value === "Select") return;
            salaryComponentSelect.mutate(event.target.value);
          }}
        >
          <option key="Select">Select</option>
          {salaryComponentNames?.data &&
            unselectedSalaryComponents?.map((salaryComponentName) => (
              <option key={salaryComponentName}>{salaryComponentName}</option>
            ))}
        </select>
        <br />
        {salaryComponentSelect.isLoading && <p>Salary Component Loading...</p>}
        {salaryComponentSelect.isError && (
          <p>Error : {JSON.stringify(salaryComponentSelect.error.message)}</p>
        )}
      </div>
      <div>
        <label htmlFor="selected-components">Selected Salary Components</label>
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
            {selectedSalaryComponents?.map((salaryComponent) => (
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
      <div>
        <button
          onClick={() => {
            salaryTemplatePut.mutate();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SalaryTemplateEditor;
