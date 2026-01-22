import { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo_icon.png';

const StaffRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        branch: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${API_URL}/api/requests`, formData);
            setSubmitted(true);
            toast.success('Registration request sent successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error submitting request');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted</h2>
                    <p className="text-gray-600 mb-6">
                        Your details have been sent to the Administrator.
                        Once approved, you will receive your official login credentials.
                    </p>
                    <p className="text-sm text-gray-500">You may close this window.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <ToastContainer />
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
                <div className="text-center mb-8">
                    <img src={logo} alt="InterSkill Solutions" className="h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-primary">Staff Registration Portal</h1>
                    <p className="text-gray-500 mt-2">Submit your details for account creation.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Branch / Department</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Proposed Password</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Set a strong password"
                            required
                        />
                        <p className="text-xs text-red-500 mt-1">
                            * Please set a complex password (letters, numbers, symbols).
                        </p>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                        <h3 className="font-bold text-yellow-700 text-sm mb-1">Important Notes</h3>
                        <ul className="list-disc list-inside text-xs text-yellow-800 space-y-1">
                            <li>All activity on this portal is tracked.</li>
                            <li>Do not perform unauthorized actions without Admin permission.</li>
                            <li>In case of any query, contact the Administrator immediately.</li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StaffRegister;
