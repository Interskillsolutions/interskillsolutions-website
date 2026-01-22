const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(async () => {
        console.log('MongoDB Connected');
        try {
            const username = 'admin';
            const newPassword = 'interskillsolutions$61050';

            const user = await Admin.findOne({ username });
            if (user) {
                user.password = newPassword;
                await user.save();
                console.log(`SUCCESS: Password for '${username}' has been updated to '${newPassword}'`);
            } else {
                console.log(`User '${username}' not found. Creating it...`);
                await Admin.create({ username, password: newPassword, role: 'admin' });
                console.log(`Created user '${username}' with new password.`);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error(err));
