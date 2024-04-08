import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const DialCodeSchema = new Schema({
    country: String,
    dialCode: String,
});

const DialCode = model("dialcodes", DialCodeSchema);

export default DialCode;