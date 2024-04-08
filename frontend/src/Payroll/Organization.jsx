import { useEffect, useState } from "react";

function Organization() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [industrys, setIndustrys] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dialcodes, setDialCodes] = useState([]);
  const [lock, setLock] = useState(true);

  useEffect(async () => {
    await getIndustrys();
    await getLocations();
    await getDailCodes();
    await getStoredOrganization();
  }, []);

  const getIndustrys = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/industrys", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        setStatus("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
      setIndustrys(data);
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
        setStatus("Status : " + response.status + " - " + response.statusText);
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
        setStatus("Status : " + response.status + " - " + response.statusText);
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

  const getStoredOrganization = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/organization", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        setStatus("Status : " + response.status + " - " + response.statusText);
        throw new Error(response.status + " - " + response.statusText);
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
      setName(data[0].name);
      setIndustry(data[0].industry);
      setLocation(data[0].location);
      setAddress(data[0].address);
      setDialCode(data[0].dialCode);
      setPhone(data[0].phone);
      setEmail(data[0].email);
      setDescription(data[0].description);
    } catch (error) {
      console.log("Client-Error");
      console.log(error);
    }
  };

  const postOrganization = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/app/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: name,
          industry: industry,
          location: location,
          address: address,
          dialCode: dialCode,
          phone: phone,
          email: email,
          description: description,
        }),
      });

      console.log(response);

      if (!response.ok) {
        setStatus("Status : " + response.status + " - " + response.statusText);
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
      <p>ORGANIZATION PROFILE</p>
      <div>
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
        <label name="industry">Industry</label>{" "}
        <select
          name="industry"
          value={industry}
          disabled={lock}
          onChange={(e) => {
            setIndustry(e.target.value);
          }}
        >
          {industrys.map((industry) => (
            <option key={industry} value={industry.name}>
              {industry.name}
            </option>
          ))}
        </select>
        <br />
        <label name="location">Location</label>{" "}
        <select
          name="location"
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
        <label name="address">Address</label>{" "}
        <input
          type="text"
          name="address"
          placeholder="address"
          value={address}
          disabled={lock}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br />
        <label name="dialcode">Dail Code</label>{" "}
        <select
          name="dialcode"
          value={dialCode}
          disabled={lock}
          onChange={(e) => {
            setDialCode(e.target.value);
          }}
        >
          {dialcodes.map((dialcode) => (
            <option key={dialcode} value={dialcode.dialCode}>
              {dialcode.dialCode}
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
        <label name="description">Description</label>{" "}
        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          disabled={lock}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <button
          type="submit"
          name="submit-button"
          onClick={() => {
            if (lock) {
              postOrganization();
            } else {
              alert("Save before Submitting");
            }
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

export default Organization;
