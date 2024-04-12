import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>Welcome Home</p>
      </div>
      <div> Go to below Links : </div>
      <div>
        <br />
        <NavLink to="/employees">Employees List</NavLink>
        <br />
        <NavLink to="/employees/add">Add Employee</NavLink>
      </div>
    </div>
  );
}

export default Home;
