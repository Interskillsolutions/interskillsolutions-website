import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUserCircle, FaSave } from 'react-icons/fa';

const StaffProfile = () => {
    const { admin: user, login } = useContext(AuthContext); // login is used to update context
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        phone: '',
        branch: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username,
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                branch: user.branch || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        if (formData.password && user.role !== 'admin') {
            const confirm = window.confirm("Password changes require Admin approval. Do you want to submit a request?");
            if (!confirm) return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const updatedData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                branch: formData.branch,
            };

            if (formData.password) {
                updatedData.password = formData.password;
            }

            const { data } = await axios.put('http://localhost:5000/api/auth/profile', updatedData, config);

            // Update local storage and context
            // We need to keep the token, so we merge the response with existing token if response doesn't have it (though backend sends it)
            if (data.message) {
                toast.info(data.message);
            } else {
                toast.success("Profile Updated Successfully");
            }
            login(data); // Update context with new user data

        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        }
    };

    return (
        <div className="flex-1 p-10 bg-gray-50 h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-blue-600 p-8 text-white flex flex-col items-center justify-center">
                        <FaUserCircle className="text-9xl mb-4" />
                        <h2 className="text-2xl font-bold text-center">{formData.fullName || user.username}</h2>
                        <p className="text-blue-100 text-center uppercase tracking-wide text-sm">{user.role}</p>
                        <p className="mt-4 text-center text-sm opacity-75">
                            {user.branch ? `Branch: ${user.branch}` : 'No Branch Assigned'}
                        </p>
                    </div>
                    <div className="md:w-2/3 p-8">
                        <h3 className="text-2xl font-bold text-gray-700 mb-6">Profile Settings</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 text-sm font-semibold mb-2">Username (Read Only)</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        readOnly
                                        className="w-full px-4 py-2 bg-gray-100 border rounded cursor-not-allowed focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm font-semibold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm font-semibold mb-2">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Contact number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm font-semibold mb-2">Branch</label>
                                <select
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select Branch</option>
                                    <option value="Thane">Thane</option>
                                    <option value="Andheri">Andheri</option>
                                </select>
                            </div>

                            <hr className="my-6 border-gray-200" />
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Change Password</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 text-sm font-semibold mb-2">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm font-semibold mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded shadow-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
                                >
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffProfile;
