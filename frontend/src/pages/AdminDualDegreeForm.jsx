import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../config';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const AdminDualDegreeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { admin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        brochure: '',
        highlights: [''],
        tools: [''],
        feesROI: {
            totalFees: '',
            stipendDetails: '',
            roiComment: ''
        }
    });

    useEffect(() => {
        if (id) {
            const fetchProgram = async () => {
                try {
                    const { data } = await axios.get(`${API_URL}/api/dual-degree/${id}`);
                    setFormData({
                        ...data,
                        highlights: data.highlights?.length ? data.highlights : [''],
                        tools: data.tools?.length ? data.tools : [''],
                        feesROI: data.feesROI || { totalFees: '', stipendDetails: '', roiComment: '' }
                    });
                } catch (error) {
                    toast.error('Error fetching program details');
                }
            };
            fetchProgram();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeesChange = (e) => {
        setFormData({
            ...formData,
            feesROI: { ...formData.feesROI, [e.target.name]: e.target.value }
        });
    };

    // Arrays
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const config = {
                headers: { 
                    Authorization: `Bearer ${admin.token}`,
                    'Content-Type': 'multipart/form-data'
                },
            };

            const dataToSubmit = new FormData();
            dataToSubmit.append('title', formData.title);
            dataToSubmit.append('category', formData.category);
            dataToSubmit.append('description', formData.description);
            dataToSubmit.append('feesROI[totalFees]', formData.feesROI.totalFees);
            dataToSubmit.append('feesROI[stipendDetails]', formData.feesROI.stipendDetails);
            dataToSubmit.append('feesROI[roiComment]', formData.feesROI.roiComment);
            
            formData.highlights.filter(h => h.trim() !== '').forEach((h, i) => {
                dataToSubmit.append(`highlights[${i}]`, h);
            });
            formData.tools.filter(t => t.trim() !== '').forEach((t, i) => {
                dataToSubmit.append(`tools[${i}]`, t);
            });

            if (file) {
                dataToSubmit.append('brochure', file);
            }

            // In backend controller we might need to parse these arrays properly, 
            // but express body-parser normally turns highlights[0] into arrays if properly configured.
            // Wait, our backend dualDegreeController currently expects req.body.highlights as an array immediately.
            // Mongoose creates the doc. Let's send basic JSON instead of form-data if no file, 
            // OR we fix backend to parse. For simplicity, we just send standard JSON unless file present.
        } catch(error) {
             toast.error('Failed processing form');
             setLoading(false);
             return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${admin.token}` } };
            
            // To be safe with the current simple backend controller, let's use standard JSON, 
            // and maybe handle file upload in a dedicated route or extended controller. 
            // The user requested "adding brochure download". 
            // For now, let's send JSON. If file exists, we'll upload it.
            
            let finalData = { ...formData };
            finalData.highlights = finalData.highlights.filter(h => h.trim() !== '');
            finalData.tools = finalData.tools.filter(t => t.trim() !== '');

            // For file upload, we use multipart form data
            const submitPayload = new FormData();
            submitPayload.append('title', formData.title);
            submitPayload.append('category', formData.category);
            submitPayload.append('description', formData.description);
            submitPayload.append('feesROI[totalFees]', formData.feesROI.totalFees);
            submitPayload.append('feesROI[stipendDetails]', formData.feesROI.stipendDetails);
            submitPayload.append('feesROI[roiComment]', formData.feesROI.roiComment);
            
            // Send JSON strings for arrays to be parsed in backend (requires backend update)
            submitPayload.append('highlights', JSON.stringify(finalData.highlights));
            submitPayload.append('tools', JSON.stringify(finalData.tools));

            if (file) {
                submitPayload.append('brochure', file);
            }

            const headerConfig = {
                headers: { 
                    Authorization: `Bearer ${admin.token}`,
                    // Browser sets content-type dynamically for FormData
                }
            };

            if (id) {
                await axios.put(`${API_URL}/api/dual-degree/${id}`, submitPayload, headerConfig);
                toast.success('Program updated successfully');
            } else {
                await axios.post(`${API_URL}/api/dual-degree`, submitPayload, headerConfig);
                toast.success('Program created successfully');
            }
            navigate('/admin/dual-degree');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error saving program');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button onClick={() => navigate('/admin/dual-degree')} className="flex items-center text-gray-600 hover:text-primary mb-6">
                <FaArrowLeft className="mr-2" /> Back to Programs
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">{id ? 'Edit Program' : 'Add New Dual Degree Program'}</h1>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input className="w-full px-4 py-2 border rounded-lg" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category (e.g. BSc IT)</label>
                        <input className="w-full px-4 py-2 border rounded-lg" name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea className="w-full px-4 py-2 border rounded-lg h-32" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4">Fees & ROI</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Total Fees</label>
                            <input className="w-full px-4 py-2 border rounded-lg" name="totalFees" value={formData.feesROI.totalFees} onChange={handleFeesChange} placeholder="e.g. ₹5,00,000" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Stipend Details</label>
                            <input className="w-full px-4 py-2 border rounded-lg" name="stipendDetails" value={formData.feesROI.stipendDetails} onChange={handleFeesChange} placeholder="e.g. ₹8k-12k /month" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">ROI Comment</label>
                            <input className="w-full px-4 py-2 border rounded-lg" name="roiComment" value={formData.feesROI.roiComment} onChange={handleFeesChange} placeholder="Earn while you learn" />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold border-b pb-2 mb-4">Brochure Upload</h3>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full p-2 border rounded-lg" />
                    {formData.brochure && !file && <p className="text-sm mt-2 text-green-600">Current brochure exists. Uploading new one will replace it.</p>}
                </div>

                <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition flex justify-center items-center gap-2">
                    {loading ? 'Saving...' : <><FaSave /> Save Program</>}
                </button>
            </form>
        </div>
    );
};

export default AdminDualDegreeForm;
