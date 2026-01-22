import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../config';
import { FaBook, FaClock, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/courses`);
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto pt-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Our <span className="text-primary">Courses</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Explore our wide range of industry-oriented courses designed to boost your career.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full border border-gray-100">
                            {course.image ? (
                                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <FaBook className="text-gray-400 text-4xl" />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                        {course.category || 'General'}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                    {course.description}
                                </p>

                                <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                                    <div className="flex items-center">
                                        <FaClock className="mr-1 text-primary" />
                                        {course.duration}
                                    </div>
                                    <div className="flex items-center">
                                        <FaChalkboardTeacher className="mr-1 text-primary" />
                                        {course.mode}
                                    </div>
                                </div>

                                <Link
                                    to={`/courses/${course._id}`}
                                    className="w-full block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    View Details <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
