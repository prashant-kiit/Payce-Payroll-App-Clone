import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";

function SalaryTemplateAdder() {
  console.log("SalaryTemplateAdder Running");

  const [unselectedSalaryComponents, setUnselectedSalaryComponents] = useState(
    []
  );
  const [selectedSalaryComponents, setSelectedSalaryComponents] = useState([]);
  const [profile, setProfile] = useState("");
  const [basic, setBasic] = useState(0);
  const [ctc, setCTC] = useState(0);

  const salaryComponentNames = useQuery({
    queryKey: ["salaryComponentNames"],
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

  const salaryTemplate = useMutation({
    mutationFn: async () => {
      await postSalaryTemplate();
    },
  });

  const getSalaryComponentNames = async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/app/salaryComponentNames"
    );

    console.log(
      "Status : " + response.status + " - Status Text : " + response.statusText
    );

    console.log(response.data);

    setUnselectedSalaryComponents(response.data);

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

  const postSalaryTemplate = async () => {
    const response = await axios.post(
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

  if (salaryComponentNames.isLoading) {
    return (
      <div>
        <p>Loading Salary Component Names...</p>
      </div>
    );
  }

  if (salaryComponentNames.isError) {
    console.log(salaryComponentNames.error);

    return (
      <div>
        <p>
          {JSON.stringify(
            "Error code = " +
              salaryComponentNames.error.response.status +
              " and message = " +
              salaryComponentNames.error.message +
              " and body = " +
              salaryComponentNames.error.response.data.data
          )}
        </p>
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

  if (salaryTemplate.isLoading) {
    return (
      <div>
        <p>Loading Salary Template Names...</p>
      </div>
    );
  }

  if (salaryTemplate.isError) {
    return (
      <div>
        <p>{JSON.stringify("Error code = " + salaryTemplate.error)}</p>
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

  if (salaryTemplate.isSuccess) {
    return (
      <div>
        <p>Salary Template Successful</p>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Add Another Salary Template
        </button>
        <br />
        <br />
        <div>
          <NavLink to="/salaryTemplates">Salary Template List</NavLink>
        </div>
      </div>
    );
  }

  // after salaryComponentNames successfully loaded
  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>ADD SALARY TEMPLATE</p>
      </div>
      <div>
        <label htmlFor="profile">Profile </label>
        <input
          id="profile"
          type="text"
          placeholder="profile"
          value={profile}
          onChange={(event) => {
            setProfile(event.target.value);
          }}
        />{" "}
        <label htmlFor="basic">Basic {" ($ per month) "}</label>
        <input
          id="basic"
          type="number"
          placeholder="basic"
          value={basic}
          onChange={async (event) => {
            if (event.target.value < 0) return;
            setBasic(event.target.value);
            await calculateCTC(event.target.value);
          }}
        />{" "}
        <label htmlFor="basic">CTC </label>
        <input id="ctc" type="number" placeholder="ctc" value={ctc} disabled />
      </div>
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
          <p>Error : {JSON.stringify(salaryComponent.error.message)}</p>
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
      <hr />
      <div>
        <button
          onClick={() => {
            if (profile === "") alert("Profile must be filled");
            salaryTemplate.mutate();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SalaryTemplateAdder;
