const mongoose = require('mongoose');

// Define the Medical Record Schema (since it is a nested list)
const medicalRecordSchema = new mongoose.Schema({
    type: String,
    description: String,
    notes: String
});

// Define the Main Child Schema
const childSchema = new mongoose.Schema({
    orphanage_id: { type: String, required: true },
    name: { type: String, required: true },
    age: Number,
    gender: String,
    nationality: String,
    religion: String,
    blood: String,
    
    // Nesting the medical records array
    medical_records: [medicalRecordSchema], 

    personality: String,
    hobbies: String,
    adoption_status: { type: String, default: "Available" }, // Default value
    legal_status: String,
    bio: String,
    guardian_notes: String,
    admitted_at: { type: Date, default: Date.now }
});

module.exports = childSchema;