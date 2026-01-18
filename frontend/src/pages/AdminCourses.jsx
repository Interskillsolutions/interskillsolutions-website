import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { admin } = useContext(AuthContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/courses`);
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('Failed to load courses');
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${admin.token}` },
                };
                await axios.delete(`${API_URL}/api/courses/${id}`, config);
                setCourses(courses.filter((course) => course._id !== id));
                toast.success('Course deleted successfully');
            } catch (error) {
                toast.error('Failed to delete course');
            }
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FaBook className="text-primary" /> Manage Courses
                </h1>
                <Link
                    to="/admin/courses/add"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add New Course
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                            <div className="h-40 bg-gray-100 relative">
                                {course.image ? (
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <FaBook size={40} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    {course.category}
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                                <div className="mt-auto flex gap-2">
                                    <Link
                                        to={`/admin/courses/edit/${course._id}`}
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100 transition"
                                    >
                                        <FaEdit /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(course._id)}
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

export default AdminCourses;
