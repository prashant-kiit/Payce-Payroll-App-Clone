import { NavLink } from "react-router-dom";

function PayHistory() {
  console.log("Pay History Running");

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>PAY HISTORY</p>
      </div>
      <div></div>
      <div>
        <br />
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}

export default PayHistory;
