import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { FaTrash, FaUserPlus, FaSpinner } from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminStaff = () => {
    const { token, admin } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (admin && admin.role === 'admin') {
            fetchUsers();
            fetchRequests();
        } else {
            setLoading(false);
        }
    }, [token, admin]);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data);
        } catch (err) {
            console.error('Error fetching requests');
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/auth/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users:', err);
            setLoading(false);
            if (err.response && err.response.status === 401) {
                toast.error('Unauthorized');
            }
        }
    };

    const deleteRequest = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/requests/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Request removed');
            fetchRequests();
        } catch (err) {
            toast.error('Failed to remove request');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Please provide username and password');
            return;
        }

        setSubmitting(true);

        try {
            await axios.post(`${API_URL}/api/auth/staff`, { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Staff added successfully');
            setUsername('');
            setPassword('');
            fetchUsers();
        } catch (err) {
            console.error('Error adding staff:', err);
            toast.error(err.response?.data?.message || 'Failed to add staff');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRoleUpdate = async (id, newRole) => {
        try {
            await axios.put(`${API_URL}/api/auth/users/${id}/role`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`User promoted to ${newRole}`);
            fetchUsers();
        } catch (err) {
            console.error('Error updating role:', err);
            toast.error(`Update failed: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleDelete = async (id) => {
        toast.info('Processing deletion...', { autoClose: 1000 });
        try {
            await axios.delete(`${API_URL}/api/auth/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (err) {
            console.error('Error deleting user:', err);
            toast.error(`Delete failed: ${err.response?.data?.message || err.message}`);
        }
    };

    if (admin && admin.role !== 'admin') {
        return (
            <div className="p-8 text-center text-red-600 font-bold text-xl">
                Access Denied. Only Admins can manage staff.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Staff</h1>

            {/* --- Pending Requests Section --- */}
            {requests.length > 0 && (
                <div className="mb-10 bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                        <span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full mr-2">{requests.length}</span>
                        Pending Staff Requests
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-sm">
                            <thead>
                                <tr className="bg-yellow-100 text-yellow-900 text-sm uppercase">
                                    <th className="py-3 px-4 text-left">Full Name</th>
                                    <th className="py-3 px-4 text-left">Details</th>
                                    <th className="py-3 px-4 text-left">Proposed Password</th>
                                    <th className="py-3 px-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm">
                                {requests.map(req => (
                                    <tr key={req._id} className="border-b border-yellow-50 last:border-none hover:bg-yellow-50/50">
                                        <td className="py-3 px-4 font-medium">{req.fullName}</td>
                                        <td className="py-3 px-4">
                                            <div className="font-bold">{req.branch}</div>
                                            <div className="text-xs text-gray-500">{req.email}</div>
                                            <div className="text-xs text-gray-500">{req.phone}</div>
                                        </td>
                                        <td className="py-3 px-4 font-mono bg-gray-50 select-all">{req.password}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setUsername(req.email); // Auto-fill username
                                                    setPassword(req.password); // Auto-fill password
                                                    window.scrollTo({ top: 300, behavior: 'smooth' });
                                                    toast.info('Credentials copied to form below!');
                                                }}
                                                className="text-blue-600 hover:text-blue-800 mr-4 font-semibold text-xs border border-blue-200 px-2 py-1 rounded"
                                            >
                                                Process
                                            </button>
                                            <button
                                                onClick={() => deleteRequest(req._id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Add Staff Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaUserPlus className="mr-2 text-primary" /> Add New Staff
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Staff Username"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 h-[42px] ${submitting ? 'cursor-not-allowed' : ''}`}
                    >
                        {submitting ? <FaSpinner className="animate-spin" /> : 'Add Staff'}
                    </button>
                </form>
            </div>

            {/* Users List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">Existing Users ({users.length})</h2>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : users.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No users found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                                <tr>
                                    <th className="p-4">Username</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium text-gray-800">{user.username}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.role || 'staff'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            {user.username !== admin.username && (
                                                <>
                                                    {user.role !== 'admin' && (
                                                        <button
                                                            onClick={() => handleRoleUpdate(user._id, 'admin')}
                                                            className="text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-100 transition text-xs font-bold border border-purple-200"
                                                            title="Promote to Admin"
                                                        >
                                                            Make Admin
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStaff;
