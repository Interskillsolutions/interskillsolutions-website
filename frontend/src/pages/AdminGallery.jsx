import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit, FaImage, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import API_URL from '../config';

const AdminGallery = () => {
    const { admin } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        story: '',
        eventDate: new Date().toISOString().split('T')[0],
    });

    const [featuredImage, setFeaturedImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/gallery`);
            setItems(res.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch gallery items');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0]);
    };

    const handleAdditionalImagesChange = (e) => {
        setAdditionalImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('story', formData.story);
        data.append('eventDate', formData.eventDate);

        if (featuredImage) {
            data.append('featuredImage', featuredImage);
        }

        additionalImages.forEach(img => {
            data.append('images', img);
        });

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${admin.token}`
                }
            };

            if (isEditing) {
                await axios.put(`${API_URL}/api/gallery/${editId}`, data, config);
                toast.success('Gallery item updated successfully');
            } else {
                await axios.post(`${API_URL}/api/gallery`, data, config);
                toast.success('Gallery item created successfully');
            }

            setShowModal(false);
            resetForm();
            fetchGalleryItems();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            story: '',
            eventDate: new Date().toISOString().split('T')[0],
        });
        setFeaturedImage(null);
        setAdditionalImages([]);
        setIsEditing(false);
        setEditId(null);
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            description: item.description,
            story: item.story || '',
            eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
        });
        setIsEditing(true);
        setEditId(item._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this gallery item?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${admin.token}`
                    }
                };
                await axios.delete(`${API_URL}/api/gallery/${id}`, config);
                toast.success('Deleted successfully');
                fetchGalleryItems();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add New Gallery
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                            <div className="relative h-48">
                                <img
                                    src={item.featuredImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 flex-1">
                                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
                                <div className="flex items-center text-xs text-gray-400">
                                    <FaCalendarAlt className="mr-1" />
                                    {new Date(item.eventDate).toLocaleDateString()}
                                    <span className="mx-2">•</span>
                                    <FaImage className="mr-1" />
                                    {item.images?.length || 0} Additional Photos
                                </div>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400">No gallery items found. Add your first one!</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                        <h2 className="text-xl font-bold mb-6">{isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                    placeholder="e.g. Annual Tech Convocation 2025"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Short Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg h-20"
                                    required
                                    placeholder="Brief overview for the card display..."
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Event Date</label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={formData.eventDate}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Featured Image</label>
                                    <input
                                        type="file"
                                        onChange={handleFeaturedImageChange}
                                        className="w-full p-2 border rounded-lg text-sm"
                                        accept="image/*"
                                        required={!isEditing}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Additional Gallery Photos (Select Multiple)</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleAdditionalImagesChange}
                                    className="w-full p-2 border rounded-lg text-sm"
                                    accept="image/*"
                                />
                                <p className="text-xs text-gray-400 mt-1">These will appear in the "View More" section.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Full Story / Article</label>
                                <textarea
                                    name="story"
                                    value={formData.story}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg h-40"
                                    placeholder="Detail the event highlights, key moments, and any relevant story..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-bold"
                                >
                                    {isEditing ? 'Update Gallery' : 'Create Gallery'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;
