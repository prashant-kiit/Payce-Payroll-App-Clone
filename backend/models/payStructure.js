import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const PayStructureSchema = new Schema({
    unitId: Number,
    components: Object,
});

const PayStructure = model('PayStructure', PayStructureSchema);

export default PayStructure;