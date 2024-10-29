const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    nationality: { type: String, required: true },
    pincode: { type: String, required: true }
});

const Patient = mongoose.modelNames().includes("Patient")
    ? mongoose.model("Patient")
    : mongoose.model("Patient", patientSchema);

module.exports = Patient;
