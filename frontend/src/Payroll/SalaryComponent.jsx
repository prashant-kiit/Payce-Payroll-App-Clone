import { useForm } from "react-hook-form";

function SalaryComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // getValues,
  } = useForm();

  const postSalaryComponent = async (data) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>ADD SALARY COMPONENT</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(postSalaryComponent)}>
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
          {errors.name && (
            <>
              <p>{`${errors.name.message}`}</p>
            </>
          )}

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
          {errors.amount && (
            <>
              <p>{`${errors.amount.message}`}</p>
            </>
          )}

          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SalaryComponent;
