import { Router } from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import Employee from "./models/employee.js";
import Organization from "./models/organization.js";

const router = Router();

router.get("/paySlip", async (req, res) => {
  try {
    const organization = await Organization.find();
    const employees = await Employee.find();

    employees.forEach(async (employee) => {
      await generatePaySlip(organization[0], employee);
    });

    res.status(200).send({ data: "Get Successful" });
  } catch (error) {
    console.log("Server-Error");
    console.log(error);

    res.status(200).send({ data: "Get Failure. Error: " + error.message });
  }
});

async function generatePaySlip(organization, employee) {
  let salaryComponentsTemp = [
    ["Basic(Rs.)", "absolute", employee.paySlip.basic, employee.paySlip.basic],
  ];

  employee.paySlip.salaryComponents.forEach((salaryComponent) => {
    let payType =
      salaryComponent.calculationType === "absolute" ? "(Rs.)" : "(%)";
    let name = salaryComponent.name + payType;
    let value = 0;

    if (salaryComponent.calculationType === "absolute") {
      value = salaryComponent.amount;
    } else {
      value = (salaryComponent.amount / 100) * employee.paySlip.basic;
    }

    salaryComponentsTemp.push([
      name,
      salaryComponent.calculationType,
      salaryComponent.amount,
      value,
    ]);
  });

  const paySlip = {
    organization: organization.name,

    employeeDetails: [
      ["Name", employee.name],
      ["Id", employee.empId],
      ["Designation", employee.paySlip.profile],
      ["Department", employee.department],
      ["Location", employee.location],
    ],

    salaryComponents: salaryComponentsTemp,

    ctc: ["Cost to Company", employee.paySlip.ctc],
  };

  generatePDF(paySlip, `paySlips/Pay_Slip_${employee.empId}.pdf`);
}

function generatePDF(paySlip, filename) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filename));

  doc.fontSize(12).text(paySlip.organization, { align: "center" });
  doc.fontSize(12).text("Pay Slip", { align: "center" });

  doc.moveDown();

  drawTable(doc, paySlip);

  doc.end();
}

function drawTable(doc, paySlip) {
  // console.log(paySlip);

  const startX = doc.x;
  let startY = doc.y;

  doc.rect(startX + 0, startY, 470, 18).stroke();
  doc.text("Employee Details", startX + 0 + 5, startY + 5);
  startY += 18;
  paySlip.employeeDetails.forEach((employeeDetail) => {
    doc.rect(startX + 0, startY, 235, 30).stroke();
    doc.text(employeeDetail[0], startX + 0 + 5, startY + 5);
    doc.rect(startX + 235, startY, 235, 30).stroke();
    doc.text(employeeDetail[1], startX + 235 + 5, startY + 5);
    startY += 30;
  });

  startY += 30;

  doc.rect(startX + 0, startY, 470, 18).stroke();
  doc.text("Salary Components", startX + 0 + 5, startY + 5);
  startY += 18;
  paySlip.salaryComponents.forEach((salaryComponent) => {
    salaryComponent.forEach((cell, i) => {
      doc.rect(startX + i * 117.5, startY, 117.5, 18).stroke();
      doc.text(cell, startX + i * 117.5 + 5, startY + 5);
    });
    startY += 18;
  });

  startY += 5;

  doc.rect(startX + 0, startY, 352.5, 18).stroke();
  doc.text(paySlip.ctc[0], startX + 0 + 5, startY + 5);
  doc.rect(startX + 352.5, startY, 117.5, 18).stroke();
  doc.text(paySlip.ctc[1], startX + 352.5 + 5, startY + 5);
}

// generatePaySlip();

export default router;
