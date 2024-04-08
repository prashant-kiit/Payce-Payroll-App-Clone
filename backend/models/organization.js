import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const OrganizationSchema = new Schema({
  name: String,
  industry: String,
  location: String,
  address: String,
  dialCode: String,
  phone: String,
  email: String,
  description: String,
});

const Organization = model("Organization", OrganizationSchema);

export default Organization;