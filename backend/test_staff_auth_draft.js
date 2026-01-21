const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

// Helper to log results
const log = (msg, type = 'info') => console.log(`[${type.toUpperCase()}] ${msg}`);

async function runTest() {
    try {
        // 1. Login as Admin (Assume seed admin exists)
        // We need valid credentials. I'll try 'admin' / '123456' as typically used in seeds or similar.
        // If not, I'll have to inspect seed.js or create one.
        // Let's check seed.js content first?
        // Wait, I saw seed.js in step 4 list_dir but didn't view it.
        // I'll try a common default. If fails, I'll note it.
        // Actually, let's just try to register a new admin temporarily if possible? 
        // registerAdmin is available at /register.

        const adminUser = { username: 'testadmin_' + Date.now(), password: 'password123' };
        log(`Registering Admin: ${adminUser.username}`);
        let adminRes;
        try {
            adminRes = await axios.post(`${API_URL}/register`, adminUser);
            log('Admin Registered');
        } catch (e) {
            log('Admin Registration failed (maybe already exists), trying login...', 'warn');
            adminRes = await axios.post(`${API_URL}/login`, adminUser);
        }

        const adminToken = adminRes.data.token;
        log(`Admin Logged In. Role: ${adminRes.data.role}`);

        if (adminRes.data.role !== 'admin' && adminRes.data.role !== undefined) {
            // If role is missing (undefined), it might be old admin without role.
            // But my code defaults to 'staff'. Admin needs 'admin'.
            // registerAdmin DOES NOT set role to 'admin' explicitly in my previous code!
            // Wait! registerAdmin usage in authController:
            // const admin = await Admin.create({ username, password });
            // Schema default is 'staff'.
            // SO REGISTERED ADMINS VIA /register WILL BE STAFF!!
            // I MISSED THIS!
            // I need to fix registerAdmin or manually update the DB for the test.
            // OR, update registerAdmin to set role='admin'.
        }

        // Fix: registerAdmin needs to set role='admin'.
        // I will fix this in the code first!

    } catch (err) {
        console.error('Test Failed:', err.response ? err.response.data : err.message);
    }
}

// I realized a bug. I need to fix registerAdmin first.
