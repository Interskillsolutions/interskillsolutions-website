import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

const BrochurePopup = ({ isOpen, onClose, brochureUrl: initialBrochureUrl, title = "Download Brochure", submitText = "Download Now", fixedCourse = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
    });
    const [courses, setCourses] = useState([]);
    const [selectedBrochure, setSelectedBrochure] = useState(initialBrochureUrl);

    useEffect(() => {
        if (isOpen) {
            if (fixedCourse) {
                // If a specific course context is provided, lock it
                setFormData(prev => ({ ...prev, interest: fixedCourse.title }));
                setSelectedBrochure(fixedCourse.brochure || initialBrochureUrl);
            } else {
                // Otherwise fetch all courses for the Global popup
                const fetchCourses = async () => {
                    try {
                        const { data } = await axios.get(`${API_URL}/api/courses`);
                        setCourses(data);
                        if (data.length > 0 && !formData.interest) {
                            setFormData(prev => ({ ...prev, interest: data[0].title }));
                            setSelectedBrochure(data[0].brochure || initialBrochureUrl);
                        }
                    } catch (error) {
                        console.error("Failed to fetch courses for brochure popup", error);
                    }
                };
                fetchCourses();
            }
        }
    }, [isOpen, fixedCourse]); // Add fixedCourse dependency

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'interest' && !fixedCourse) {
            const course = courses.find(c => c.title === value);
            if (course) {
                setSelectedBrochure(course.brochure);
            } else {
                setSelectedBrochure(null);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/leads`, {
                ...formData,
                source: title,
            });

            // Use the specific course's brochure if available, otherwise fallback to prop or generic
            const downloadUrl = selectedBrochure || initialBrochureUrl;

            if (downloadUrl) {
                toast.success('Brochure downloading...');
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.target = '_blank';
                link.download = `InterSkill_${formData.interest.replace(/\s+/g, '_')}_Brochure.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                toast.success('Request submitted! Our team will contact you shortly.');
            }
            onClose();

        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <FaTimes size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Priya Patel"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="priya.patel@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            pattern="[0-9]{10}"
                            placeholder="99887 76655"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Interested Course</label>
                        {fixedCourse ? (
                            <input
                                type="text"
                                value={formData.interest}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-100 text-gray-600 rounded-md shadow-sm focus:outline-none cursor-not-allowed"
                            />
                        ) : (
                            <select
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a Course</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course.title}>{course.title}</option>
                                ))}
                                <option value="Other">Other</option>
                            </select>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
                    >
                        Download Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BrochurePopup;
