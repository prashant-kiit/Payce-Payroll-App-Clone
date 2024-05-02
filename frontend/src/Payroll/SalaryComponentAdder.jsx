import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";

function SalaryComponentAdder() {
  console.log("SalaryComponentAdder Renders");
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    reset,
  } = useForm();

  const postSalaryComponent = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/app/salaryComponent",
        {
          name: getValues("name"),
          payType: getValues("payType"),
          calculationType: getValues("calculationType"),
          amount: getValues("amount"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(isSubmitted);
      console.log(isSubmitSuccessful);
      console.log("POST request successful");
      console.log(`Status = ${response.status},
      Status Text = ${response.statusText} and
      Body = ${response.data.data}`);
    } catch (error) {
      console.log("Client Error");
      console.log(error);
      setError("clientError", {
        type: "custom",
        message: `Status = ${error.response.status}, Status Text = ${error.response.statusText}, Error Message = ${error.message} and Error Body = ${error.response.data.data}`,
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
    console.log(isSubmitted);
    console.log(isSubmitSuccessful);
  };

  if (errors.clientError) {
    return (
      <div>
        {errors.clientError && (
          <p>Error : {JSON.stringify(errors.clientError.message)}</p>
        )}

        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Add Another Salary Component
        </button>
        <br />
        <br />
        <NavLink to="/salaryComponents">Salary Component List</NavLink>
      </div>
    );
  }

  if (isSubmitSuccessful) {
    return (
      <div>
        <p>Form submitted successfully</p>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Add Another Salary Component
        </button>
        <br />
        <br />
        <NavLink to="/salaryComponents">Salary Component List</NavLink>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>ADD SALARY COMPONENT</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(postSalaryComponent, onError)}>
          <label htmlFor="name">Component Name</label>
          <br />
          <input
            name="name"
            {...register("name", {
              required: "Component Name is required",
            })}
            type="text"
            placeholder="component name"
          />
          <br />
          {errors.name && <p>Error : {`${errors.name.message}`}</p>}

          <label htmlFor="payType">Pay Type</label>
          <br />
          <select
            name="payType"
            {...register("payType", {
              required: "Pay Type is required",
            })}
          >
            <option value="fixed">Fixed</option>
            <option value="variable">Variable</option>
          </select>
          <br />

          <label htmlFor="calculationType">Calculation Type</label>
          <br />
          <select
            name="calculationType"
            {...register("calculationType", {
              required: "Calculation Type is required",
            })}
          >
            <option value="absolute">Absolute</option>
            <option value="percentage">Percentage</option>
          </select>
          <br />

          <label htmlFor="amount">Amount</label>
          <br />
          <input
            name="amount"
            {...register("amount", {
              required: "Amount is required",
              validate: (value) =>
                value >= 0 || "Amount must be equal to or greater than zero",
            })}
            type="number"
            placeholder="amount"
          />
          <br />
          {errors.amount && <p>Error : {`${errors.amount.message}`}</p>}

          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SalaryComponentAdder;
