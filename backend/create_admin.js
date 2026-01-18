const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill');
        console.log('MongoDB Connected');

        const username = 'admin';
        const password = 'password123';

        const adminExists = await Admin.findOne({ username });

        if (adminExists) {
            // Update existing admin password
            adminExists.password = password; // Pre-save hook will hash it
            await adminExists.save();
            console.log(`Admin '${username}' updated with new password: ${password}`);
        } else {
            // Create new admin
            const admin = new Admin({ username, password });
            await admin.save();
            console.log(`Admin created: ${username} / ${password}`);
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error creating admin:', error);
        mongoose.disconnect();
    }
};

createAdmin();
