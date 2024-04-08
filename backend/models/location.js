import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const LocationSchema = new Schema({
  name: String,
  industry: String,
  location: String,
  address: String,
  countryCode: String,
  phone: String,
  email: String,
  description: String,
});

const Location = model("locations", LocationSchema);

export default Location;