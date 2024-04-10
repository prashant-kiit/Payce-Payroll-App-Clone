import { Router } from "express";
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
import dotenv from "dotenv";
import twilio from "twilio";
import readline from "readline";

const router = Router();
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

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

    console.log(organization);

    await Organization.deleteMany({});
    await organization.save();

    res.status(200).send();
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/organization", async (req, res) => {
  try {
    const organization = await Organization.find();

    console.log("organization");
    console.log(organization);

    res.status(200).send(organization);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/industrys", async (req, res) => {
  try {
    const industrys = await Industry.find();

    console.log("industrys");
    console.log(industrys);

    res.status(200).send(industrys);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find();

    console.log("locations");
    console.log(locations);

    res.status(200).send(locations);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/dialcodes", async (req, res) => {
  try {
    const dialcodes = await DialCode.find();

    console.log("dial codes");
    console.log(dialcodes);

    res.status(200).send(dialcodes);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/qualifications", async (req, res) => {
  try {
    const educations = await Qualification.find();

    console.log("educations");
    console.log(educations);

    res.status(200).send(educations);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/designations", async (req, res) => {
  try {
    const designations = await Designation.find();

    console.log("designations");
    console.log(designations);

    res.status(200).send(designations);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find();

    console.log("departments");
    console.log(departments);

    res.status(200).send(departments);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
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

    console.log(employee);

    await employee.save();
    res.status(200).send();
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
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
    console.log(response);

    res.status(200).send(response);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    res.send(error);
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
    res.status(200).send();
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/payst/:unitId", async (req, res) => {
  try {
    const payStructure = await PayStructure.find({ unitId: req.params.unitId });
    console.log(payStructure);
    res.setHeader("Content-Type", "application/json; charset=UTF-8");
    res.status(200).send(payStructure);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/emp/:id", async (req, res) => {
  try {
    const employee = await Employee.find({ id: req.params.id });
    res.setHeader("Content-Type", "application/json; charset=UTF-8");
    res.status(200).send(employee);
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
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
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
});

router.get("/components", async (req, res) => {
  try {
    let componentStatus = {};
    Object.keys(Components).map((component) => {
      componentStatus[component] = false;
    });

    res.status(200).send(componentStatus);
  } catch (err) {
    console.log("Server-error");
    console.log(err);
    res.send(err);
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
    res.status(200).send();
  } catch (err) {
    console.log("Server-Error");
    console.log(err);
    res.send(err);
  }
  console.log("Message Queued");
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
  } catch (err) {
    console.log("Server-Error");
    res.send(err);
  }
});

export default router;
