import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaGraduationCap } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const AdminDualDegree = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { admin } = useContext(AuthContext);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/dual-degree`);
                setPrograms(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dual degree programs:', error);
                toast.error('Failed to load programs');
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this program?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${admin.token}` },
                };
                await axios.delete(`${API_URL}/api/dual-degree/${id}`, config);
                setPrograms(programs.filter((prog) => prog._id !== id));
                toast.success('Program deleted successfully');
            } catch (error) {
                toast.error('Failed to delete program');
            }
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FaGraduationCap className="text-primary" /> Manage Dual Degree Programs
                </h1>
                <Link
                    to="/admin/dual-degree/add"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add New Program
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program) => (
                        <div key={program._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="text-sm font-bold text-primary mb-2">{program.category}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>
                                
                                {program.brochure && (
                                    <div className="mb-4">
                                        <a href={`${API_URL}${program.brochure}`} target="_blank" rel="noreferrer" className="text-blue-500 text-sm hover:underline border border-blue-500 px-3 py-1 rounded inline-block">
                                            View Brochure
                                        </a>
                                    </div>
                                )}

                                <div className="mt-auto flex gap-2">
                                    <Link
                                        to={`/admin/dual-degree/edit/${program._id}`}
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100 transition"
                                    >
                                        <FaEdit /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(program._id)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 transition"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDualDegree;
