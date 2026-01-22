import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit, FaPlus, FaSortNumericDown } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import API_URL from '../config';

const AdminCategories = () => {
    const { admin } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', priority: 0 });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/categories`);
            setCategories(data);
            setLoading(false);
        } catch (error) {
            toast.error('Error fetching categories');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${admin.token}` },
        };

        try {
            if (editId) {
                await axios.put(`${API_URL}/api/categories/${editId}`, formData, config);
                toast.success('Category updated');
                setEditId(null);
            } else {
                await axios.post(`${API_URL}/api/categories`, formData, config);
                toast.success('Category created');
            }
            setFormData({ name: '', priority: 0 });
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving category');
        }
    };

    const handleEdit = (category) => {
        setFormData({ name: category.name, priority: category.priority });
        setEditId(category._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This will not delete courses but might affect their display.')) return;
        try {
            await axios.delete(`${API_URL}/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${admin.token}` },
            });
            toast.success('Category deleted');
            fetchCategories();
        } catch (error) {
            toast.error('Error deleting category');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Categories</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        {editId ? <><FaEdit /> Edit Category</> : <><FaPlus /> Add New Category</>}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="e.g. Data Science"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority (Order)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                required
                                min="0"
                                placeholder="1 = Top"
                            />
                            <p className="text-xs text-gray-500 mt-1">Lower number appears first in menu.</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {editId ? 'Update' : 'Add'}
                            </button>
                            {editId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditId(null); setFormData({ name: '', priority: 0 }); }}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan="3" className="text-center py-8">Loading...</td></tr>
                                ) : categories.length === 0 ? (
                                    <tr><td colSpan="3" className="text-center py-8 text-gray-500">No categories found.</td></tr>
                                ) : (
                                    categories.map((cat) => (
                                        <tr key={cat._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-bold text-xs border border-blue-200">
                                                    #{cat.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {cat.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(cat)}
                                                    className="text-blue-600 hover:text-blue-900 mx-2"
                                                    title="Edit"
                                                >
                                                    <FaEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat._id)}
                                                    className="text-red-600 hover:text-red-900 mx-2"
                                                    title="Delete"
                                                >
                                                    <FaTrash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
