import { useCallback } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

function SalaryComponentEditor() {
  console.log("SalaryComponentEditor Renders");
  const { name } = useParams();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm({
    defaultValues: async () => {
      const defaultData = await getSalaryComponent(name);
      return {
        name: defaultData.name,
        payType: defaultData.payType,
        calculationType: defaultData.calculationType,
        amount: defaultData.amount,
      };
    },
  });

  const getSalaryComponent = async (name) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/app/salaryComponent/${name}`
      );

      console.log(
        "Status : " +
          response.status +
          " - Status Text : " +
          response.statusText
      );

      console.log(response.data);

      response.data.map((x) => {
        console.log(x.name);
        console.log(x.payType);
        console.log(x.calculationType);
        console.log(x.amount);
      });

      return response.data[0];
    } catch (error) {
      console.log("Client Error");
      console.log(error);
      setError("deleteError", {
        type: "custom",
        message: `Status = ${error.response.status}, Status Text = ${error.response.statusText}, Error Message = ${error.message} and Error Body = ${error.response.data.data}`,
      });
    }
  };

  const putSalaryComponent = async () => {
    try {
      console.log({
        name: getValues("name"),
        payType: getValues("payType"),
        calculationType: getValues("calculationType"),
        amount: getValues("amount"),
      });

      const response = await axios.put(
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
      console.log("PUT request successful");
      console.log(
        `Status = ${response.status}, Status Text = ${response.statusText} and Body = ${response.data.data}`
      );
    } catch (error) {
      console.log("Client Error");
      console.log(error);
      setError("putError", {
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

  if (errors.deleteError) {
    return (
      <div>
        {errors.deleteError && (
          <p>Error : {JSON.stringify(errors.deleteError.message)}</p>
        )}

        <br />
        <NavLink to="/salaryComponents">Salary Component List</NavLink>
      </div>
    );
  }

  if (errors.putError) {
    return (
      <div>
        {errors.putError && (
          <p>Error : {JSON.stringify(errors.putError.message)}</p>
        )}

        <br />
        <NavLink to="/salaryComponents">Salary Component List</NavLink>
      </div>
    );
  }

  if (isSubmitSuccessful) {
    return (
      <div>
        <p>Form submitted successfully</p>
        <br />
        <NavLink to="/salaryComponents">Salary Component List</NavLink>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>EDIT SALARY COMPONENT</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(putSalaryComponent, onError)}>
          <label htmlFor="name">Component Name</label>
          <br />
          <input
            name="name"
            {...register("name", {
              required: "Component Name is required",
            })}
            type="text"
            placeholder="component name"
            disabled
          />
          <br />
          {errors.name && <p>Error : {`${errors.name.message}`}</p>}

          <label htmlFor="payType">Pay Type</label>
          <br />
          <select name="payType" {...register("payType")}>
            <option value="fixed">Fixed</option>
            <option value="variable">Variable</option>
          </select>
          <br />

          <label htmlFor="calculationType">Calculation Type</label>
          <br />
          <select name="calculationType" {...register("calculationType")}>
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
          {errors.amount && <p>Error : {errors.amount.message}</p>}

          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SalaryComponentEditor;
