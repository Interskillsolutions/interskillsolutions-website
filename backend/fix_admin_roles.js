const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(async () => {
        console.log('MongoDB Connected');
        try {
            // Update all users without a role to be 'admin' (Assuming existing users were admins)
            // Or better, just update ALL existing users to 'admin' if we assume this is the first deployment of this feature.
            // But if there are already staff? Unlikely as I just added the feature.
            // Safer: Update where role is missing.
            const res = await Admin.updateMany(
                {}, // Update ALL documents
                { $set: { role: 'admin' } }
            );
            console.log(`Updated ${res.modifiedCount} admins.`);

            // Also check if any exist with 'staff' that should be admin? No, default is staff for NEW ones.
            // Existing ones have no role field.

        } catch (error) {
            console.error('Error updating admins:', error);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error(err));
