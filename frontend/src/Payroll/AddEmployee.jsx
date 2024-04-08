import { useEffect, useState } from "react";

function AddEmployee() {
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
  const [ctc, setCTC] = useState(0);
  const [educations, setEducations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dialCodes, setDialCodes] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    getEducations();
    getDesignations();
    getDepartments();
    getDailCodes();
    getLocations();
  }, []);

  const getEducations = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/qualifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
      setEducations(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/locations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
      setLocations(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  const getDailCodes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/dialcodes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
      setDialCodes(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  const getDesignations = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/designations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
      setDesignations(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/departments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
      setDepartments(data);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  const postEmployee = async () => {
    try {
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

      console.log(response);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }
    } catch (err) {
      console.log("Client-Error");
      console.log(err);
    }
  };

  return (
    <>
      <h2>Payroll App</h2>
      <p>ADD EMPLOYEEE</p>
      <div>
        <label name="empId">Employee Id</label>{" "}
        <input
          type="text"
          name="empId"
          placeholder="employee id"
          value={empId}
          disabled={lock}
          onChange={(e) => {
            setEmpId(e.target.value);
          }}
        />
        <br />
        <label name="name">Name</label>{" "}
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          disabled={lock}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label name="education">Education</label>{" "}
        <select
          type="text"
          name="education"
          placeholder="education"
          value={education}
          disabled={lock}
          onChange={(e) => {
            setEducation(e.target.value);
          }}
        >
          {educations.map((education) => (
            <option key={education} value={education.name}>
              {education.name}
            </option>
          ))}
        </select>
        <br />
        <label name="designation">Designation</label>{" "}
        <select
          type="text"
          name="designation"
          placeholder="designation"
          value={designation}
          disabled={lock}
          onChange={(e) => {
            setDesignation(e.target.value);
          }}
        >
          {designations.map((designation) => (
            <option key={designation} value={designation.name}>
              {designation.name}
            </option>
          ))}
        </select>
        <br />
        <label name="doj">Date Of Joining</label>{" "}
        <input
          type="date"
          name="doj"
          placeholder="date of joining"
          value={doj}
          disabled={lock}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
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
          }}
        />
        <br />
        <label name="location">Location</label>{" "}
        <select
          type="text"
          name="location"
          placeholder="location"
          value={location}
          disabled={lock}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        >
          {locations.map((location) => (
            <option key={location} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
        <br />
        <label name="department">Department</label>{" "}
        <select
          type="text"
          name="department"
          placeholder="department"
          value={department}
          disabled={lock}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        >
          {departments.map((department) => (
            <option key={department} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
        <br />
        <label name="dialCode">Dial Code</label>{" "}
        <select
          type="text"
          name="dialCode"
          placeholder="dial code"
          value={dialCode}
          disabled={lock}
          onChange={(e) => {
            setDialCode(e.target.value);
          }}
        >
          {dialCodes.map((dialCode) => (
            <option key={dialCode} value={dialCode.dialCode}>
              {dialCode.dialCode}
            </option>
          ))}
        </select>
        <br />
        <label name="phone">Phone</label>{" "}
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={phone}
          disabled={lock}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <label name="email">Email</label>{" "}
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          disabled={lock}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label name="ctc">Cost To Company</label>{" "}
        <input
          type="number"
          name="ctc"
          placeholder="ctc"
          value={ctc}
          disabled={lock}
          onChange={(e) => {
            setCTC(e.target.value);
          }}
        />
        <br />
        <button
          type="submit"
          name="submit-button"
          onClick={() => {
            postEmployee();
          }}
        >
          Submit
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
    </>
  );
}
// "http://127.0.0.1:3000/app/unit"
export default AddEmployee;
