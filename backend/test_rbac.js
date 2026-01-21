const axios = require('axios');

const API_URL = 'http://localhost:5001/api/auth';

const log = (msg, type = 'info') => {
    const color = type === 'error' ? '\x1b[31m' : type === 'success' ? '\x1b[32m' : '\x1b[36m';
    console.log(`${color}[${type.toUpperCase()}] ${msg}\x1b[0m`);
};

async function runTest() {
    try {
        log('Starting RBAC Verification...');

        // 1. Register/Login as Admin
        const adminUser = { username: 'rbac_admin_' + Date.now(), password: 'password123' };
        let adminToken;

        try {
            const res = await axios.post(`${API_URL}/register`, adminUser);
            adminToken = res.data.token;
            log(`Admin Created: ${adminUser.username} (Role: ${res.data.role})`, 'success');
            if (res.data.role !== 'admin') throw new Error('Registered admin is not role=admin');
        } catch (e) {
            // If fails, try login (if we re-run script)
            // But unique username ensures fresh run usually.
            log('Admin registration failed: ' + e.message, 'error');
            return;
        }

        // 2. Create Staff
        const staffUser = { username: 'rbac_staff_' + Date.now(), password: 'password123' };
        try {
            const res = await axios.post(`${API_URL}/staff`, staffUser, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            log(`Staff Created: ${staffUser.username} (Role: ${res.data.role})`, 'success');
            if (res.data.role !== 'staff') throw new Error('Created staff is not role=staff');
        } catch (e) {
            log('Staff creation failed: ' + (e.response?.data?.message || e.message), 'error');
            return;
        }

        // 3. Login as Staff
        let staffToken;
        try {
            const res = await axios.post(`${API_URL}/login`, staffUser);
            staffToken = res.data.token;
            log(`Staff Logged In`, 'success');
        } catch (e) {
            log('Staff login failed', 'error');
            return;
        }

        // 4. Test: Admin can Get Users
        try {
            const res = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            log(`Admin access to /users: Allowed (Count: ${res.data.length})`, 'success');
        } catch (e) {
            log('Admin access to /users: DENIED (Unexpected)', 'error');
        }

        // 5. Test: Staff CANNOT Get Users
        try {
            await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${staffToken}` }
            });
            log('Staff access to /users: ALLOWED (FAILURE)', 'error');
        } catch (e) {
            if (e.response && e.response.status === 401) {
                log('Staff access to /users: Correctly DENIED (401)', 'success');
            } else {
                log(`Staff access to /users: Failed with ${e.response?.status} (Maybe OK)`, 'info');
            }
        }

        // 6. Test: Staff CANNOT Create Staff
        try {
            await axios.post(`${API_URL}/staff`, { username: 'bad', password: '123' }, {
                headers: { Authorization: `Bearer ${staffToken}` }
            });
            log('Staff access to create staff: ALLOWED (FAILURE)', 'error');
        } catch (e) {
            if (e.response && e.response.status === 401) {
                log('Staff access to create staff: Correctly DENIED (401)', 'success');
            }
        }

    } catch (err) {
        log('Global Error: ' + err.message, 'error');
    }
}

runTest();
