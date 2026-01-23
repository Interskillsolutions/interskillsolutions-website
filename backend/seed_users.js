const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(async () => {
        console.log('MongoDB Connected');

        // 1. Ensure Main Admin Exists
        const adminUser = await Admin.findOne({ username: 'admin' });
        if (!adminUser) {
            await Admin.create({
                username: 'admin',
                password: 'password123', // Will be hashed by pre-save hook
                role: 'admin',
                fullName: 'System Administrator',
                email: 'admin@interskill.com',
                branch: 'Head Office'
            });
            console.log('Created Admin User: admin');
        } else {
            // Fix role if incorrect
            if (adminUser.role !== 'admin') {
                adminUser.role = 'admin';
                await adminUser.save();
                console.log('Updated Admin User role to admin');
            } else {
                console.log('Admin User already exists and is correct');
            }
        }

        // 2. Ensure a Staff User Exists
        const staffUser = await Admin.findOne({ username: 'staff1' });
        if (!staffUser) {
            await Admin.create({
                username: 'staff1',
                password: 'password123',
                role: 'staff',
                fullName: 'John Staff',
                email: 'john@interskill.com',
                branch: 'Pune Branch'
            });
            console.log('Created Staff User: staff1');
        } else {
            console.log('Staff User (staff1) already exists');
        }

        // 3. Ensure 'admindiwateyash' Exists (Requested earlier)
        const yash = await Admin.findOne({ username: 'admindiwateyash' });
        if (!yash) {
            await Admin.create({
                username: 'admindiwateyash',
                password: 'password123',
                role: 'admin',
                fullName: 'Yash Diwate',
                branch: 'Head Office'
            });
            console.log('Created Admin: admindiwateyash');
        }

        console.log('User Seeding Complete');
        process.exit();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
