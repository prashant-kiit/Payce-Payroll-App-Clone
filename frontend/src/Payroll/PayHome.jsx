import { NavLink } from "react-router-dom";

function PayHome() {
  console.log("Pay Home Running");

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>PAY HOME</p>
      </div>
      <div>
        <br />
        <NavLink to="/payHome/drive">Pay Drive</NavLink>
        <br />
        <NavLink to="/payHome/history">Pay History</NavLink>
      </div>
      <div>
        <br />
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}

export default PayHome;
