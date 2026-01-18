import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { FaTrash, FaPlus, FaImage, FaSpinner } from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminPartners = () => {
    const { token } = useContext(AuthContext);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPartners();
    }, [token]);

    const fetchPartners = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/partners`);
            setPartners(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching partners:', err);
            setLoading(false);
            toast.error('Failed to load partners');
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !file) {
            toast.error('Please provide both name and logo');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('logo', file);

        setSubmitting(true);

        try {
            await axios.post(`${API_URL}/api/partners`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Partner added successfully');
            setName('');
            setFile(null);
            // Reset file input
            document.getElementById('fileInput').value = '';
            fetchPartners();
        } catch (err) {
            console.error('Error adding partner:', err);
            toast.error('Failed to add partner');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this partner?')) return;

        try {
            await axios.delete(`${API_URL}/api/partners/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Partner deleted');
            fetchPartners();
        } catch (err) {
            console.error('Error deleting partner:', err);
            toast.error('Failed to delete partner');
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Partners</h1>

                {/* Add Partner Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FaPlus className="mr-2 text-primary" /> Add New Partner
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary outline-none"
                                placeholder="e.g. Interskill Solutions"
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
                            <input
                                id="fileInput"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary outline-none bg-gray-50"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`bg-primary text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 h-[42px] ${submitting ? 'cursor-not-allowed' : ''}`}
                        >
                            {submitting ? <FaSpinner className="animate-spin" /> : 'Add Partner'}
                        </button>
                    </form>
                </div>

                {/* Partners List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-700">Existing Partners ({partners.length})</h2>
                    </div>
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : partners.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No partners added yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                                    <tr>
                                        <th className="p-4">Logo</th>
                                        <th className="p-4">Name</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {partners.map((partner) => (
                                        <tr key={partner._id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded borber border-gray-200">
                                                    <img
                                                        src={`${API_URL}${partner.logo}`}
                                                        alt={partner.name}
                                                        className="max-w-full max-h-full object-contain p-1"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4 font-medium text-gray-800">{partner.name}</td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(partner._id)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPartners;
