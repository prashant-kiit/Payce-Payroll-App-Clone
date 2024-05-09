import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";

function EmployeeAdder() {
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [designation, setDesignation] = useState("");
  const [doj, setDOJ] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ctc, setCTC] = useState("");
  const [educations, setEducations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dialCodes, setDialCodes] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [lock, setLock] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    async function getDropDownListContent() {
      await getEducations();
      await getDesignations();
      await getDepartments();
      await getDailCodes();
      await getLocations();
    }
    getDropDownListContent();
  }, []);

  const getEducations = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/qualifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      console.log("response");
      console.log(response);

      let data = await response.json();
      data.unshift({ _id: 0, id: 0, name: "" });
      console.log("data");
      console.log(data);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setEducations(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  }, []);

  const getLocations = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/locations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      console.log("response");
      console.log(response);

      let data = await response.json();
      data.unshift({ _id: 0, id: 0, name: "" });
      console.log("data");
      console.log(data);

      if (!response.ok) {
        alert("Failure : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setLocations(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  }, []);

  const getDailCodes = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/dialcodes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      console.log("response");
      console.log(response);

      let data = await response.json();
      data.unshift({ _id: 0, country: "xyx", dialCode: "" });
      console.log("data");
      console.log(data);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setDialCodes(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  }, []);

  const getDesignations = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/app/salaryTemplateProfiles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      console.log("response");
      console.log(response);

      let data = await response.json();
      data.unshift(" ");
      console.log("data");
      console.log(data);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setDesignations(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  }, []);

  const getDepartments = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/departments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      console.log("response");
      console.log(response);

      let data = await response.json();
      data.unshift({ _id: 0, id: 0, name: "" });
      console.log("data");
      console.log(data);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setDepartments(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  }, []);

  const postEmployee = useCallback(async () => {
    try {
      console.log(
        JSON.stringify({
          empId: empId,
          name: name,
          education: education,
          designation: designation,
          doj: doj,
          location: location,
          department: department,
          dialCode: dialCode,
          phone: phone,
          email: email,
          ctc: ctc,
        })
      );
      const response = await fetch("http://127.0.0.1:3000/app/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          empId: empId,
          name: name,
          education: education,
          designation: designation,
          doj: doj,
          location: location,
          department: department,
          dialCode: dialCode,
          phone: phone,
          email: email,
          ctc: ctc,
        }),
      });

      console.log("response");
      console.log(response);
      console.log("data");
      const data = await response.json();
      console.log(data.data);

      if (!response.ok) {
        alert(
          "Status : " +
            response.status +
            " - " +
            response.statusText +
            " - " +
            data.data
        );
        throw new Error(
          response.status + " - " + response.statusText + " - " + data.data
        );
      } else {
        setStatus(true);
      }
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  }, [
    empId,
    name,
    education,
    designation,
    doj,
    location,
    department,
    dialCode,
    phone,
    email,
    ctc,
  ]);

  const setDesignationCTC = async (profile) => {
    try {
      if (profile === " ") {
        setDesignation(" ");
        setCTC("");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:3000/app/salaryTemplateCTC/${profile}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      console.log("response");
      console.log(response);

      let data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setDesignation(profile);
      setCTC(Number(data.ctc));
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  if (status) {
    return (
      <div>
        <div>
          <p>Employee Added</p>
        </div>
        <div>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Add Another Employee
          </button>
        </div>
        <div>
          <br />
          <NavLink to={`/employees/${empId}`}>
            Edit the Last Submitted Employee
          </NavLink>
          <br />
          <NavLink to="/employees">Employees List</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Payroll App</h2>
        <p>ADD EMPLOYEEE</p>
      </div>
      <div>
        <label name="empId">Employee Id*</label>{" "}
        <input
          type="text"
          name="empId"
          key={"1"}
          value={empId}
          disabled={lock}
          onChange={(e) => {
            setEmpId(e.target.value);
          }}
        />
        <br />
        <label htmlFor="name">Name*</label>{" "}
        <input
          type="text"
          name="name"
          key={"2"}
          value={name}
          disabled={lock}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="education">Education*</label>{" "}
        <select
          type="text"
          name="education"
          key={"3"}
          value={education}
          disabled={lock}
          onChange={(e) => {
            setEducation(e.target.value);
          }}
        >
          {educations.map((education) => (
            <option key={education.id} value={education.name}>
              {education.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="designation">Designation*</label>{" "}
        <select
          type="text"
          name="designation"
          key={"4"}
          value={designation}
          disabled={lock}
          onChange={(e) => {
            setDesignationCTC(e.target.value);
          }}
        >
          {designations.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="doj">Date Of Joining*</label>{" "}
        <input
          type="date"
          name="doj"
          key={"5"}
          value={doj}
          disabled={lock}
          onChange={(e) => {
            const currentDate = new Date();
            const selectedDate = new Date(e.target.value);
            if (selectedDate <= currentDate) {
              const year = selectedDate.getFullYear();
              const month = selectedDate.getMonth() + 1;
              const date = selectedDate.getDate();
              const formattedDate =
                year +
                "-" +
                (month.toString().length === 1 ? "0" + month : month) +
                "-" +
                (date.toString().length === 1 ? "0" + date : date);
              setDOJ(formattedDate);
            } else {
              alert("Cannot enter future date");
            }
          }}
        />
        <br />
        <label htmlFor="location">Location*</label>{" "}
        <select
          type="text"
          name="location"
          key={"6"}
          value={location}
          disabled={lock}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        >
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="department">Department*</label>{" "}
        <select
          type="text"
          name="department"
          key={"7"}
          value={department}
          disabled={lock}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        >
          {departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="dialCode">Dial Code*</label>{" "}
        <select
          type="text"
          name="dialCode"
          key={"8"}
          value={dialCode}
          disabled={lock}
          onChange={(e) => {
            setDialCode(e.target.value);
          }}
        >
          {dialCodes.map((dialCode) => (
            <option key={dialCode.country} value={dialCode.dialCode}>
              {dialCode.dialCode}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="phone">Phone*</label>{" "}
        <input
          type="text"
          name="phone"
          key={"9"}
          value={phone}
          disabled={lock}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <label htmlFor="email">Email*</label>{" "}
        <input
          type="text"
          name="email"
          key={"10"}
          value={email}
          disabled={lock}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="ctc">Cost To Company {"(in $ per year)"}*</label>{" "}
        <input type="number" name="ctc" key={"11"} value={ctc} disabled />
        <br />
        <button
          type="submit"
          name="submit-button"
          onClick={async () => {
            if (
              empId === "" ||
              name === "" ||
              education === "" ||
              designation === "" ||
              doj === "" ||
              location === "" ||
              department === "" ||
              dialCode === "" ||
              phone === "" ||
              email === "" ||
              ctc === ""
            ) {
              alert("Please fill the mandatory fields");
            } else {
              if (lock) {
                await postEmployee();
              } else {
                alert("Save before submitting");
              }
            }
          }}
        >
          Add Employee
        </button>{" "}
        <button
          type="submit"
          name="edit/save-button"
          onClick={() => {
            setLock(!lock);
          }}
        >
          {lock ? "Edit" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeAdder;
