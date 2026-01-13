const mongoose = require('mongoose');
// 1. Load environment variables
require('dotenv').config({ path: '../../.env' }); 

// Note on path: Since Connect.js is in src/utils, we need to go up two levels 
// (../../) to find the .env file in the 'backend' root folder.

const childSchema = require('../models/Children'); 

// 2. Use the variable from your .env file
const uri = process.env.DATABASE_URI; 

const connectMongoose = async () => {
    try {
        if (!uri) {
            throw new Error("DATABASE_URI is missing from .env file");
        }

        // 3. Connect
        await mongoose.connect(uri);
        console.log("Mongoose connected to orphanage_db");

        // 4. Create Model
        const Child = mongoose.model('Child', childSchema);

        // 5. Create a new Child object
        const newChild = new Child({
            orphanage_id: 'admin_nainika',
            name: 'Vikram Singh',
            age: 7,
            gender: 'Male',
            nationality: 'Indian',
            religion: 'Sikh',
            blood: 'O+',
            medical_records: [
                { type: "Medical", description: "Allergy", notes: "Dust allergy" }
            ],
            personality: "Curious",
            hobbies: "Building blocks",
            adoption_status: "Available",
            legal_status: "Clear",
            bio: "Vikram loves building structures.",
            guardian_notes: "Very active child.",
            admitted_at: new Date()
        });

        // 6. Save to MongoDB
        await newChild.save();
        console.log("New child saved:", newChild.name);

        // 7. Fetch/Find Data
        const children = await Child.find({ 
            orphanage_id: 'admin_nainika' 
        });
        
        console.log("--- Found Children in DB ---");
        console.log(children);

    } catch (error) {
        console.log("Error occurred:", error);
    } finally {
        // 8. Close connection
        mongoose.connection.close();
    }
}

exports.connectMongoose = connectMongoose;

// Uncomment below to run directly
// connectMongoose();