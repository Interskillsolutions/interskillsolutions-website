import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../config';
import { FaPlus, FaTrash, FaSave, FaArrowLeft } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const AdminCourseForm = () => {
    const { id } = useParams(); // If id exists, it's edit mode
    const navigate = useNavigate();
    const { admin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        duration: '',
        mode: 'Online',
        fees: '',
        image: '',
        highlights: [''],
        tools: [''],
        syllabus: [{ title: '', topics: [''] }]
    });

    useEffect(() => {
        if (id) {
            const fetchCourse = async () => {
                try {
                    const { data } = await axios.get(`${API_URL}/api/courses/${id}`);
                    // Ensure arrays are initialized even if empty in DB
                    setFormData({
                        ...data,
                        highlights: data.highlights && data.highlights.length ? data.highlights : [''],
                        tools: data.tools && data.tools.length ? data.tools : [''],
                        syllabus: data.syllabus && data.syllabus.length ? data.syllabus : [{ title: '', topics: [''] }]
                    });
                } catch (error) {
                    toast.error('Error fetching course details');
                }
            };
            fetchCourse();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Array Handlers (Highlights & Tools) ---
    const handleArrayChange = (index, value, field) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };
    const addArrayItem = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };
    const removeArrayItem = (index, field) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArray });
    };

    // --- Syllabus Handlers ---
    const handleModuleChange = (index, value) => {
        const newSyllabus = [...formData.syllabus];
        newSyllabus[index].title = value;
        setFormData({ ...formData, syllabus: newSyllabus });
    };
    const handleTopicChange = (moduleIndex, topicIndex, value) => {
        const newSyllabus = [...formData.syllabus];
        newSyllabus[moduleIndex].topics[topicIndex] = value;
        setFormData({ ...formData, syllabus: newSyllabus });
    };
    const addModule = () => {
        setFormData({ ...formData, syllabus: [...formData.syllabus, { title: '', topics: [''] }] });
    };
    const removeModule = (index) => {
        const newSyllabus = formData.syllabus.filter((_, i) => i !== index);
        setFormData({ ...formData, syllabus: newSyllabus });
    };
    const addTopic = (moduleIndex) => {
        const newSyllabus = [...formData.syllabus];
        newSyllabus[moduleIndex].topics.push('');
        setFormData({ ...formData, syllabus: newSyllabus });
    };
    const removeTopic = (moduleIndex, topicIndex) => {
        const newSyllabus = [...formData.syllabus];
        newSyllabus[moduleIndex].topics = newSyllabus[moduleIndex].topics.filter((_, i) => i !== topicIndex);
        setFormData({ ...formData, syllabus: newSyllabus });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const config = {
                headers: { Authorization: `Bearer ${admin.token}` },
            };

            // Clean up empty strings before sending
            const cleanedData = {
                ...formData,
                highlights: formData.highlights.filter(item => item.trim() !== ''),
                tools: formData.tools.filter(item => item.trim() !== ''),
                syllabus: formData.syllabus.filter(mod => mod.title.trim() !== '')
                    .map(mod => ({
                        ...mod,
                        topics: mod.topics.filter(t => t.trim() !== '')
                    }))
            };

            if (id) {
                await axios.put(`${API_URL}/api/courses/${id}`, cleanedData, config);
                toast.success('Course updated successfully');
            } else {
                await axios.post(`${API_URL}/api/courses`, cleanedData, config);
                toast.success('Course created successfully');
            }
            navigate('/admin/courses');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error saving course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button onClick={() => navigate('/admin/courses')} className="flex items-center text-gray-600 hover:text-primary mb-6">
                <FaArrowLeft className="mr-2" /> Back to Courses
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-8">{id ? 'Edit Course' : 'Add New Course'}</h1>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Course Title</label>
                        <input className="input-field" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">Description</label>
                        <textarea className="input-field h-32" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="label">Category</label>
                        <input className="input-field" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Data Science" />
                    </div>
                    <div>
                        <label className="label">Duration</label>
                        <input className="input-field" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 12 Weeks" />
                    </div>
                    <div>
                        <label className="label">Mode</label>
                        <select className="input-field" name="mode" value={formData.mode} onChange={handleChange}>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Image URL</label>
                        <input className="input-field" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">Brochure URL</label>
                        <input
                            className="input-field"
                            name="brochure"
                            value={formData.brochure || ''}
                            onChange={handleChange}
                            placeholder="https://drive.google.com/..."
                        />
                        <p className="text-xs text-gray-500 mt-1">Paste a link to your brochure (Google Drive, Dropbox, etc.)</p>
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* Highlights */}
                <div>
                    <label className="label block mb-2">Highlights</label>
                    {formData.highlights.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                className="input-field"
                                value={item}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'highlights')}
                                placeholder="Feature highlight"
                            />
                            <button type="button" onClick={() => removeArrayItem(index, 'highlights')} className="text-red-500 hover:bg-red-50 p-2 rounded"><FaTrash /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('highlights')} className="text-sm text-primary font-semibold flex items-center gap-1"><FaPlus /> Add Highlight</button>
                </div>

                <hr className="border-gray-200" />

                {/* Tools */}
                <div>
                    <label className="label block mb-2">Tools & Technologies</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tools.map((item, index) => (
                            <div key={index} className="flex gap-1 items-center bg-gray-50 border border-gray-200 p-1 rounded">
                                <input
                                    className="bg-transparent outline-none text-sm p-1 w-32"
                                    value={item}
                                    onChange={(e) => handleArrayChange(index, e.target.value, 'tools')}
                                    placeholder="Tool name"
                                />
                                <button type="button" onClick={() => removeArrayItem(index, 'tools')} className="text-red-400 hover:text-red-600 p-1"><FaTrash size={12} /></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => addArrayItem('tools')} className="text-sm text-primary font-semibold flex items-center gap-1"><FaPlus /> Add Tool</button>
                </div>

                <hr className="border-gray-200" />

                {/* Syllabus */}
                <div>
                    <label className="label block mb-4 text-xl">Syllabus Modules</label>
                    {formData.syllabus.map((module, mIndex) => (
                        <div key={mIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                            <div className="flex justify-between items-center mb-3">
                                <input
                                    className="input-field font-bold bg-white"
                                    value={module.title}
                                    onChange={(e) => handleModuleChange(mIndex, e.target.value)}
                                    placeholder={`Module ${mIndex + 1} Title`}
                                />
                                <button type="button" onClick={() => removeModule(mIndex)} className="text-red-500 hover:bg-red-100 p-2 rounded ml-2"><FaTrash /></button>
                            </div>

                            <div className="pl-4 border-l-2 border-gray-300">
                                {module.topics.map((topic, tIndex) => (
                                    <div key={tIndex} className="flex gap-2 mb-2">
                                        <input
                                            className="input-field text-sm py-1"
                                            value={topic}
                                            onChange={(e) => handleTopicChange(mIndex, tIndex, e.target.value)}
                                            placeholder="Topic"
                                        />
                                        <button type="button" onClick={() => removeTopic(mIndex, tIndex)} className="text-gray-400 hover:text-red-500"><FaTrash size={12} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addTopic(mIndex)} className="text-xs text-primary font-semibold mt-1 flex items-center gap-1"><FaPlus /> Add Topic</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addModule} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg npm hover:border-primary hover:text-primary transition font-semibold flex justify-center items-center gap-2"><FaPlus /> Add New Module</button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 shadow-lg transition flex justify-center items-center gap-2"
                >
                    {loading ? 'Saving...' : <><FaSave /> Save Course</>}
                </button>
            </form>

            <style>{`
                .label { @apply block text-sm font-semibold text-gray-700 mb-1; }
                .input-field { @apply w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow; }
            `}</style>
        </div>
    );
};

export default AdminCourseForm;
