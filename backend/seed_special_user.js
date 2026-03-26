const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(async () => {
        console.log('MongoDB Connected');

        const username = 'diwateyash2004@gmail.com';
        const password = '123456';
        
        const existingUser = await Admin.findOne({ username });
        if (!existingUser) {
            await Admin.create({
                username,
                password, // Hashed by pre-save hook
                role: 'admin',
                fullName: 'Yash Diwate',
                email: username,
                branch: 'Head Office'
            });
            console.log(`Created Special User: ${username}`);
        } else {
            existingUser.password = password; // Update password just in case
            existingUser.role = 'admin';
            await existingUser.save();
            console.log(`Updated Special User: ${username}`);
        }

        console.log('Special User Seeding Complete');
        process.exit();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
