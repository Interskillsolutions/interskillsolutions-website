const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(async () => {
        console.log('MongoDB Connected');
        try {
            // 1. Ensure 'admin' exists and is admin
            const adminUser = await Admin.findOne({ username: 'admin' });
            if (adminUser) {
                adminUser.role = 'admin';
                // Only update password if needed? User said "password is password123", assuming they mean CURRENT.
                // If I reset it, it might break if they changed it. I'll just set role.
                await adminUser.save();
                console.log("Updated 'admin' role to 'admin'.");
            } else {
                await Admin.create({ username: 'admin', password: 'password123', role: 'admin' });
                console.log("Created 'admin' account.");
            }

            // 2. Create 'yash.interskillsolutions'
            const yashUser = await Admin.findOne({ username: 'yash.interskillsolutions' });
            if (yashUser) {
                yashUser.role = 'admin';
                yashUser.password = 'interskillsolutions$yash'; // Reset password as requested
                await yashUser.save();
                console.log("Updated 'yash.interskillsolutions' (password reset + admin role).");
            } else {
                await Admin.create({
                    username: 'yash.interskillsolutions',
                    password: 'interskillsolutions$yash',
                    role: 'admin'
                });
                console.log("Created 'yash.interskillsolutions' account.");
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error(err));
