import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";

function SalaryComponentList() {
  const salaryComponents = useQuery({
    queryKey: ["salaryComponents"],
    queryFn: async () => {
      return await getSalaryComponents();
    },
  });

  const getSalaryComponents = useCallback(async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/app/salaryComponents",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      "Status : " + response.status + " - Status Text : " + response.statusText
    );
    console.log(response);

    return response.data;
  }, []);

  const deleteSalaryComponent = useCallback(
    async (name) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:3000/app/salaryComponent/${name}`
        );

        console.log("DELETE request successful");
        console.log(
          "Status : " +
            response.status +
            " - Status Text : " +
            response.statusText +
            " - Body : " +
            response.data.data
        );
        // console.log(response);
      } catch (error) {
        console.log("Client Error");
        console.log(error);
        alert(
          "Status : " +
            error.response.status +
            " - Status Text : " +
            error.response.statusText +
            " - Body : " +
            error.response.data.data +
            " - Message : " +
            error.message
        );
      }
    },
    [name]
  );

  if (salaryComponents.isError) {
    // console.log(salaryComponents.error);
    return (
      <div>
        <p>
          {JSON.stringify(
            "Error code = " +
              salaryComponents.error.response.status +
              " and message = " +
              salaryComponents.error.message +
              " and body = " +
              salaryComponents.error.response.data.data
          )}
        </p>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </button>
        <br />
        <NavLink to="/salaryComponents/add">Add Salary Component</NavLink>
      </div>
    );
  }

  if (salaryComponents.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h2>Payroll App</h2>
        <p>SALARY COMPONENT LIST</p>
      </div>
      <div>
        <NavLink to="/salaryComponents/add">Add Salary Component</NavLink>
      </div>
      <br />
      <div>
        <table key={"saltable"}>
          <tbody>
            <tr key={"header"}>
              <th key={"nameheader"}>Name</th>
              <th key={"payTheader"}>Pay Type</th>
              <th key={"calTheader"}>Calculation Type</th>
              <th key={"amtheader"}>Amount</th>
              <th key={"actheader"}>Action</th>
            </tr>
            {salaryComponents.data.map((salaryComponent) => (
              <tr key={`row${salaryComponent.name}`}>
                <td key={`name${salaryComponent.name}`}>
                  {" "}
                  <NavLink
                    key={`navlink${salaryComponent.name}`}
                    to={`/salaryComponents/${salaryComponent.name}`}
                  >
                    {salaryComponent.name}
                  </NavLink>
                </td>
                <td key={`payT${salaryComponent.name}`}>
                  {salaryComponent.payType}
                </td>
                <td key={`calT${salaryComponent.name}`}>
                  {salaryComponent.calculationType}
                </td>
                <td key={`amt${salaryComponent.name}`}>
                  {salaryComponent.amount}
                </td>
                <td key={`action${salaryComponent.name}`}>
                  <button
                    key={`delete${salaryComponent.name}`}
                    onClick={async () => {
                      await deleteSalaryComponent(salaryComponent.name);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <br />
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    </>
  );
}

export default SalaryComponentList;
