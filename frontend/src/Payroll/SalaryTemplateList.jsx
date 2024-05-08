import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";

function SalaryTemplateList() {
  console.log("SalaryTemplateList Running");

  const salaryTemplates = useQuery({
    queryKey: ["salaryTemplates"],
    queryFn: async () => {
      return await getSalaryTemplates();
    },
  });

  const salaryTemplateDelete = useMutation({
    mutationFn: async (salaryTemplateProfile) => {
      await deleteSalaryTemplate(salaryTemplateProfile);
    },
  });

  const getSalaryTemplates = async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/app/salaryTemplates",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    return response.data;
  };

  const deleteSalaryTemplate = async (salaryTemplateProfile) => {
    const response = await axios.delete(
      `http://127.0.0.1:3000/app/salaryTemplate/${salaryTemplateProfile}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  };

  if (salaryTemplates.isLoading) {
    return (
      <div>
        <p>Salary Template is Loading ...</p>
      </div>
    );
  }

  if (salaryTemplates.isError) {
    return (
      <div>
        <p>Error : {JSON.stringify(salaryTemplates.error)}</p>
        <button
          onClick={() => {
            windows.location.reload();
          }}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>SALARY TEMPLATE LIST</p>
      </div>
      <div>
        <NavLink to="/salaryTemplates/add">Add Salary Template</NavLink>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Basics</th>
            <th>CTC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salaryTemplates?.data?.map((salaryTemplate) => (
            <tr key={salaryTemplate._id}>
              <td>
                <NavLink
                  key={`navlink${salaryTemplate.profile}`}
                  to={`/salaryTemplates/${salaryTemplate.profile}`}
                >
                  {salaryTemplate.profile}
                </NavLink>
              </td>
              <td>{salaryTemplate.basic}</td>
              <td>{salaryTemplate.ctc}</td>
              <td>
                <button
                  onClick={() => {
                    salaryTemplateDelete.mutate(salaryTemplate.profile);
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
  );
}

export default SalaryTemplateList;
