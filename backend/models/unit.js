import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const UnitSchema = new Schema({
    id: Number,
    name: String,
    type: String,
    region: String,
    currency: String,
});

const Unit = model('Unit', UnitSchema);

export default Unit;