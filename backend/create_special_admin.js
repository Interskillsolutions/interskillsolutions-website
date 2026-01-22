const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(async () => {
        console.log('MongoDB Connected');
        try {
            const username = 'admindiwateyash';
            const password = 'diwateyash$interskillsolutionsthane';

            const user = await Admin.findOne({ username });
            if (user) {
                user.role = 'admin';
                user.password = password;
                await user.save();
                console.log(`Updated user ${username}`);
            } else {
                await Admin.create({ username, password, role: 'admin' });
                console.log(`Created user ${username}`);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error(err));
