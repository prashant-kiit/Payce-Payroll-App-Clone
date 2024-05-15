import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PaySlipEditor from "./PaySlipEditor";
import axios from "axios";

function EmployeeEditor() {
  console.log("EmployeeEditor");

  // const [empId, setEmpId] = useState("");
  const { empId } = useParams();
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [originalDesignation, setOriginalDesignation] = useState("");
  const [designation, setDesignation] = useState("");
  const [originalPaySlip, setOriginalPaySlip] = useState({});
  const [paySlip, setPaySlip] = useState({});
  const [doj, setDOJ] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [ctc, setCTC] = useState("");

  const [educations, setEducations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dialCodes, setDialCodes] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [unselectedSalaryComponents, setUnselectedSalaryComponents] = useState(
    []
  );

  const [lock, setLock] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async function getDropDownListContent() {
      await getEducations();
      await getDesignations();
      await getDepartments();
      await getLocations();
      await getDailCodes();
      await getEmployee();
    })();
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
      data.unshift("");
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

  const getEmployee = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/app/employee/${empId}`
      );

      console.log("data");
      console.log(response.data[0]);

      // setEmpId(response.data[0].empId);
      setName(response.data[0].name);
      setEducation(response.data[0].education);
      setOriginalDesignation(response.data[0].designation);
      setDesignation(response.data[0].designation);
      setOriginalPaySlip(response.data[0].paySlip);
      setPaySlip(response.data[0].paySlip);
      setDOJ(response.data[0].doj);
      setLocation(response.data[0].location);
      setDepartment(response.data[0].department);
      setDialCode(response.data[0].dialCode);
      setPhone(response.data[0].phone);
      setEmail(response.data[0].email);

      console.log(
        "Status : " +
          response.request.status +
          " - Status Text : " +
          response.request.statusText
      );
    } catch (error) {
      setIsError(!isError);
      setErrorMessage(error.message + " - " + error.response.data.data);

      console.log("Client-Error");
      console.log(error);
      // alert("Status : " + error.message + " - " + error.response.data.data);
    }
  }, []);

  const putEmployee = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/app/employee/${empId}`,
        {
          empId: empId,
          name: name,
          education: education,
          designation: designation,
          paySlip: paySlip,
          doj: doj,
          location: location,
          department: department,
          dialCode: dialCode,
          phone: phone,
          email: email,
          ctc: paySlip.ctc,
        }
      );

      console.log("PUT request successful");
      console.log(
        "Status : " +
          response.request.status +
          " - Status Text : " +
          response.request.statusText +
          " - Body : " +
          response.data.data
      );

      setStatus(true);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
      alert("Status : " + error.message + " - " + error.response.data.data);
    }
  };

  const setDesignationCTC = async (profile) => {
    try {
      if (profile === "") {
        setDesignation("");
        setPaySlip({});
        setIsOpen(false);
        // setCTC(0)
        return {};
      }

      const response = await fetch(
        `http://127.0.0.1:3000/app/salaryTemplate/${profile}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      console.log("response");
      console.log(response);

      let paySlip = await response.json();
      console.log(paySlip[0]);

      if (!response.ok) {
        alert("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      setDesignation(profile);
      setPaySlip(paySlip[0]);
      // setCTC(Number(paySlip[0].ctc));

      return paySlip[0];
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  const getSalaryComponentNames = async (currentPaySlip) => {
    const response = await axios.get(
      "http://127.0.0.1:3000/app/salaryComponentNames",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    console.log("__");
    console.log(response.data);

    let tempSalaryComponentNames = [];
    currentPaySlip.salaryComponents?.map((salaryComponent) => {
      tempSalaryComponentNames.push(salaryComponent.name);
    });
    console.log(tempSalaryComponentNames);

    let tempUnselectedSalaryComponent = [];
    response.data.map((name) => {
      if (!tempSalaryComponentNames?.includes(name))
        tempUnselectedSalaryComponent.push(name);
    });
    console.log(tempUnselectedSalaryComponent);
    console.log("__");

    setUnselectedSalaryComponents(tempUnselectedSalaryComponent);
  };

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (status) {
    return (
      <div>
        <div>
          <p>Employee Edited</p>
        </div>
        <div>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Edit The Employee Again
          </button>
        </div>
        <div>
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
        <p>EDIT EMPLOYEE</p>
      </div>
      <div>
        <label name="empId">Employee Id*</label>{" "}
        <input
          type="text"
          name="empId"
          key={"1"}
          value={empId}
          disabled={true}
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
          onChange={async (e) => {
            if (e.target.value === originalDesignation) {
              setDesignation(originalDesignation);
              setPaySlip(originalPaySlip);
              await getSalaryComponentNames(originalPaySlip);
            } else {
              let currentPaySlip = await setDesignationCTC(e.target.value);
              await getSalaryComponentNames(currentPaySlip);
            }
          }}
        >
          {designations.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>
        {designation && (
          <button
            disabled={lock}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {" "}
            Edit PaySlip
          </button>
        )}
        <PaySlipEditor
          profile={designation}
          unselectedSalaryComponents={unselectedSalaryComponents}
          setUnselectedSalaryComponents={(unselectedSalaryComponents) => {
            setUnselectedSalaryComponents(unselectedSalaryComponents);
          }}
          isOpen={isOpen}
          setIsOpen={(isOpen) => {
            setIsOpen(isOpen);
          }}
          paySlip={paySlip}
          setPaySlip={(paySlip) => {
            setPaySlip(paySlip);
          }}
        />
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
        <label htmlFor="ctc">Cost To Company {"(in $ per month)"}*</label>{" "}
        <input
          type="number"
          name="ctc"
          key={"11"}
          value={paySlip.ctc}
          disabled
        />
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
              email === ""
            ) {
              alert("Please fill the mandatory fields");
            } else {
              if (lock) {
                await putEmployee();
              } else {
                alert("Save the form and the PaySlip before submitting");
              }
            }
          }}
        >
          Update Employee
        </button>{" "}
        <button
          type="submit"
          name="edit/save-button"
          onClick={() => {
            if (!isOpen) setLock(!lock);
            else alert("Save the PaySlip before saving the form");
          }}
        >
          {lock ? "Edit" : "Save"}
        </button>
      </div>
      <div>
        <br />
        <NavLink to="/employees">Employees List</NavLink>
      </div>
    </div>
  );
}

export default EmployeeEditor;
