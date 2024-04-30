import { Router } from "express";
import dotenv from "dotenv";
import twilio from "twilio";
import readline from "readline";
import _ from "lodash";
import Organization from "./models/organization.js";
import Employee from "./models/employee.js";
import PayStructure from "./models/payStructure.js";
import Components from "./data/components.js";
import Attendance from "./models/attendance.js";
import Industry from "./models/industry.js";
import Location from "./models/location.js";
import DialCode from "./models/dialcode.js";
import Designation from "./models/designation.js";
import Department from "./models/department.js";
import Qualification from "./models/education.js";
import SalaryComponent from "./models/salaryComponent.js";

const router = Router();
// dotenv.config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

router.post("/organization", async (req, res) => {
  try {
    const organization = new Organization({
      name: req.body.name,
      industry: req.body.industry,
      location: req.body.location,
      address: req.body.address,
      dialCode: req.body.dialCode,
      phone: req.body.phone,
      email: req.body.email,
      description: req.body.description,
    });

    // console.log(organization);

    await Organization.deleteMany({});
    const organizations = await Organization.find();
    if (!organizations.length === 0) {
      throw new Error("Collection not Empty");
    }

    const organizationReturned = await organization.save();

    let temp1 = {};
    Object.assign(temp1, organization);
    delete temp1._doc._id;
    delete temp1._doc.__v;

    let temp2 = {};
    Object.assign(temp2, organizationReturned);
    delete temp2._doc._id;
    delete temp2._doc.__v;

    if (!_.isEqual(temp1._doc, temp2._doc)) {
      throw new Error("Data inconsistent between Server and Database");
    }

    res.status(200).send({ data: "Post Successful" });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Post Failure : " + error });
  }
});

router.get("/organization", async (req, res) => {
  try {
    const organization = await Organization.find();

    // console.log("organization");
    console.log(organization);

    if (!organization.length === 1) {
      throw new Error("Collection has Duplicate data or No data");
    }

    res.status(200).send(organization);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/industrys", async (req, res) => {
  try {
    const industrys = await Industry.find();

    // console.log("industrys");
    // console.log(industrys);
    if (industrys.length === 0) {
      throw new Error("Empty Collection");
    }

    res.status(200).send(industrys);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find();

    // console.log("locations");
    // console.log(locations);

    if (locations.length === 0) {
      throw new Error("Empty Collection");
    }

    res.status(200).send(locations);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/dialcodes", async (req, res) => {
  try {
    const dialcodes = await DialCode.find();

    // console.log("dial codes");
    // console.log(dialcodes);

    if (dialcodes.length === 0) {
      throw new Error("Empty Collection");
    }

    res.status(200).send(dialcodes);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/qualifications", async (req, res) => {
  try {
    const educations = await Qualification.find();

    // console.log("educations");
    // console.log(educations);

    if (educations.length === 0) {
      throw new Error("Empty Collection");
    }

    res.status(200).send(educations);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/designations", async (req, res) => {
  try {
    const designations = await Designation.find();

    // console.log("designations");
    // console.log(designations);

    if (designations.length === 0) {
      throw new Error("Empty Collection");
    }

    res.status(200).send(designations);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find();

    // console.log("departments");
    // console.log(departments);

    if (departments.length === 0) {
      throw new Error("Empty Collection");
    }

    res.status(200).send(departments);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.post("/employee", async (req, res) => {
  try {
    const employee = new Employee({
      empId: req.body.empId,
      name: req.body.name,
      education: req.body.education,
      designation: req.body.designation,
      doj: req.body.doj,
      location: req.body.location,
      department: req.body.department,
      dialCode: req.body.dialCode,
      phone: req.body.phone,
      email: req.body.email,
      ctc: req.body.ctc,
    });

    // console.log(employee);

    const employeeReturned = await employee.save();

    let temp1 = {};
    Object.assign(temp1, employee);
    console.log(employee);
    console.log(temp1);
    delete temp1._doc._id;
    delete temp1._doc.__v;

    let temp2 = {};
    Object.assign(temp2, employeeReturned);
    console.log(employeeReturned);
    console.log(temp2);
    delete temp2._doc._id;
    delete temp2._doc.__v;

    if (!_.isEqual(temp1._doc, temp2._doc)) {
      throw new Error("Data inconsistent between Server and Database");
    }

    res.status(200).send({ data: "Post Successful" });
  } catch (error) {
    console.log("Server-Error");

    if (error.code === 11000 || error.code === 11001) {
      res.statusMessage =
        "Employee Profile is not Unique. Atleast any one of Emp Id, Phone, Email needs to be changed";
    }
    console.log(error);

    res.status(500).send({ data: "Post Failure : " + error });
  }
});

router.get("/employees", async (req, res) => {
  try {
    console.log("Query Parameters:", req.query);

    Object.entries(req.query).map(([key, value]) => {
      if (value === "") {
        delete req.query[key];
      }
    });

    if (
      req.query.hasOwnProperty("minCTC") &&
      req.query.hasOwnProperty("maxCTC")
    ) {
      req.query.ctc = {
        $gt: parseInt(req.query["minCTC"]),
        $lt: parseInt(req.query["maxCTC"]),
      };
      delete req.query["minCTC"];
      delete req.query["maxCTC"];
    }

    if (
      req.query.hasOwnProperty("minCTC") &&
      !req.query.hasOwnProperty("maxCTC")
    ) {
      req.query.ctc = {
        $gt: parseInt(req.query["minCTC"]),
      };
      delete req.query["minCTC"];
    }

    if (
      !req.query.hasOwnProperty("minCTC") &&
      req.query.hasOwnProperty("maxCTC")
    ) {
      req.query.ctc = {
        $lt: parseInt(req.query["maxCTC"]),
      };
      delete req.query["maxCTC"];
    }

    console.log("Modified Query Parameters:", req.query);

    const employees = await Employee.find(req.query);

    console.log(employees);

    if (employees.length === 0) {
      throw new Error("No Data");
    }

    res.status(200).send(employees);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/employee/:empId", async (req, res) => {
  try {
    console.log(req.params.empId);
    const employee = await Employee.find({
      empId: req.params.empId,
    });

    console.log(employee);

    if (employee === null || employee.length === 0) {
      throw new Error("Collection has No Data or Duplicate Data");
    }

    res.status(200).send(employee);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.put("/employee/:empId", async (req, res) => {
  try {
    const employeeNew = new Employee({
      empId: req.body.empId,
      name: req.body.name,
      education: req.body.education,
      designation: req.body.designation,
      doj: req.body.doj,
      location: req.body.location,
      department: req.body.department,
      dialCode: req.body.dialCode,
      phone: req.body.phone,
      email: req.body.email,
      ctc: req.body.ctc,
    });

    const employeeReturned = await Employee.findOneAndUpdate(
      { empId: req.body.empId },
      {
        name: req.body.name,
        education: req.body.education,
        designation: req.body.designation,
        doj: req.body.doj,
        location: req.body.location,
        department: req.body.department,
        dialCode: req.body.dialCode,
        phone: req.body.phone,
        email: req.body.email,
        ctc: req.body.ctc,
      },
      { new: true }
    );

    let temp1 = {};
    Object.assign(temp1, employeeNew);
    delete temp1._doc._id;
    delete temp1._doc.__v;

    let temp2 = {};
    Object.assign(temp2, employeeReturned);
    delete temp2._doc._id;
    delete temp2._doc.__v;

    if (!_.isEqual(temp1._doc, temp2._doc)) {
      throw new Error("Data inconsistent between Server and Database");
    }

    res.status(200).send({ data: "Put Successful" });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Put Failure : " + error });
  }
});

router.delete("/employee/:empId", async (req, res) => {
  try {
    const employeeReturned = await Employee.findOneAndDelete({
      empId: req.params.empId,
    });

    // console.log(employeeReturned);

    if (employeeReturned === null) {
      throw new Error("Collection has No Data or Duplicate Data");
    }

    res.status(200).send({ data: "Delete Successful" });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Delete Failure : " + error });
  }
});

router.post("/send-sms", async (req, res) => {
  try {
    const dialCode = req.body.dialCode;
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const response = await client.messages.create({
      from: "+13344328364",
      to: `${dialCode}${phone}`, // custom recipent phone no
      body: `This login verification message. Your OTP is ${otp}.`, // custom organization name
    });

    // console.log(response);

    res.status(200).send({ data: "Post Successful" });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Post Failure : " + error });
  }
});

router.post("/salaryComponent", async (req, res) => {
  try {
    const salaryComponent = new SalaryComponent({
      name: req.body.name,
      payType: req.body.payType,
      calculationType: req.body.calculationType,
      amount: req.body.amount,
    });

    console.log(salaryComponent);

    const salaryComponentReturned = await salaryComponent.save();

    console.log(salaryComponentReturned);

    let temp1 = {};
    Object.assign(temp1, salaryComponent);
    console.log(salaryComponent);
    console.log(temp1);
    delete temp1._doc._id;
    delete temp1._doc.__v;

    let temp2 = {};
    Object.assign(temp2, salaryComponentReturned);
    console.log(salaryComponentReturned);
    console.log(temp2);
    delete temp2._doc._id;
    delete temp2._doc.__v;

    if (!_.isEqual(temp1._doc, temp2._doc)) {
      throw new Error("Data inconsistent between Server and Database");
    }

    res.status(200).send({ data: "Post Successful" });
  } catch (error) {
    console.log("Server-Error");

    if (error.code === 11000 || error.code === 11001) {
      res.statusMessage =
        "Salary Component Name is not Unique";
    }
    console.log(error);

    res.status(500).send({ data: "Post Failure : " + error });
  }
});

router.post("/payst", async (req, res) => {
  try {
    let components = [];

    Object.entries(req.body.componentStatus).map(([component, status]) => {
      if (status) components.push(component);
    });
    console.log(components);

    const payStructure = new PayStructure({
      unitId: req.body.unitId,
      components: components,
    });

    console.log(payStructure);

    await payStructure.save();

    res.status(200).send({ data: "Post Successful" });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Post Failure : " + error });
  }
});

router.get("/payst/:unitId", async (req, res) => {
  try {
    const payStructure = await PayStructure.find({ unitId: req.params.unitId });
    console.log(payStructure);
    res.setHeader("Content-Type", "application/json; charset=UTF-8");

    res.status(200).send(payStructure);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);

    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/emp/:id", async (req, res) => {
  try {
    const employee = await Employee.find({ id: req.params.id });
    res.setHeader("Content-Type", "application/json; charset=UTF-8");

    res.status(200).send(employee);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);

    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/empsal/:id", async (req, res) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/app/emp/${req.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    const data = await response.json();
    res.status(200).send({ salary: data[0].salary });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

router.get("/components", async (req, res) => {
  try {
    let componentStatus = {};
    Object.keys(Components).map((component) => {
      componentStatus[component] = false;
    });

    res.status(200).send(componentStatus);
  } catch (error) {
    console.log("Server-error");
    console.log(error);
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

const getSalary = async (req) => {
  const response = await fetch(
    `http://127.0.0.1:3000/app/payst/${req.body.unitId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );

  const data = await response.json();
  console.log("data");
  console.log(data);
  console.log("data[0].components");
  console.log(data[0].components);
  let _salary = 0;
  for (const component of data[0].components) {
    // console.log(component)
    // console.log(typeof Components[component])
    // console.log(req.body.experience)
    let temp = Components[component](req.body.experience, req.body.experience);
    // console.log(temp)
    _salary += temp;
  }
  return _salary;
};

let attendancePerMonthCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

router.put("/attendance", async (req, res) => {
  try {
    const attendance = new Attendance({
      empId: req.body.empId,
      submissionDateAndTime: req.body.submissionDateAndTime,
      attendanceDates: req.body.attendanceDates,
    });

    await attendance.save();
    res.status(200).send({ data: "Put Successful" });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.status(500).send({ data: "Put Failure : " + error });
  }
});

router.get("/attendance/:empId", async (req, res) => {
  try {
    console.log(req.params.empId);
    const attendanceOfEmpId = await Attendance.find({
      empId: req.params.empId,
    });
    let data = {};
    for (let i = 0; i < attendanceOfEmpId.length; i++) {
      Object.assign(data, attendanceOfEmpId[i].attendanceDates);
    }

    res.status(200).send(data);
  } catch (error) {
    console.log("Server-Error");
    res.status(500).send({ data: "Get Failure : " + error });
  }
});

export default router;
