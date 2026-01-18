import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus, FaStar, FaSave, FaGripVertical } from 'react-icons/fa';
import { Reorder } from 'framer-motion';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { admin } = useContext(AuthContext); // Use context instead of localStorage
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        review: '',
        rating: 5,
        image: ''
    });

    const fetchReviews = async () => {
        try {
            // No token needed for GET requests if public, but keeping structure if needed
            // If GET is protected (unlikely for reviews), use admin.token
            const { data } = await axios.get(`${API_URL}/api/reviews`);
            setReviews(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            toast.error('Failed to load reviews');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${admin.token}` } };
                await axios.delete(`${API_URL}/api/reviews/${id}`, config);
                toast.success('Review deleted successfully');
                fetchReviews();
            } catch (error) {
                toast.error('Failed to delete review');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${admin.token}` } };
            await axios.post(`${API_URL}/api/reviews`, formData, config);
            toast.success('Review added successfully');
            setIsModalOpen(false);
            setFormData({ name: '', role: '', review: '', rating: 5, image: '' });
            fetchReviews();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add review');
        }
    };

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const handleReorder = (newOrder) => {
        setReviews(newOrder);
        setHasUnsavedChanges(true);
    };

    const saveOrder = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin.token}` } };
            // Send array of { _id, order } implicitly by sending index
            const payload = {
                reviews: reviews.map((r, index) => ({ _id: r._id, order: index }))
            };
            await axios.put(`${API_URL}/api/reviews/order`, payload, config);
            toast.success('Order saved successfully');
            setHasUnsavedChanges(false);
        } catch (error) {
            toast.error('Failed to save order');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Manage Reviews</h1>
                <div className="flex gap-3">
                    {hasUnsavedChanges && (
                        <button
                            onClick={saveOrder}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition animate-pulse"
                        >
                            <FaSave /> Save Order
                        </button>
                    )}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <FaPlus /> Add Review
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 flex items-center">
                <FaGripVertical className="mr-2" />
                <p className="text-sm">Drag and drop cards to reorder them. Click <strong>"Save Order"</strong> to apply changes to the website.</p>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <Reorder.Group axis="y" values={reviews} onReorder={handleReorder} className="grid grid-cols-1 gap-4">
                    {reviews.map((review) => (
                        <Reorder.Item key={review._id} value={review}>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="text-gray-400">
                                        <FaGripVertical />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {review.image ? (
                                            <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg">
                                                {review.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-bold text-gray-800">{review.name}</h4>
                                            <p className="text-xs text-gray-500">{review.role}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block flex-1 px-4">
                                        <div className="flex text-yellow-400 text-xs mb-1">
                                            {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-1 italic">"{review.review}"</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition ml-4"
                                    title="Delete Review"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            )}

            {/* Add Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-6">Add New Review</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role (Optional)</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g. Full Stack Developer"
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                >
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="2">2 Stars</option>
                                    <option value="1">1 Star</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                                <textarea
                                    name="review"
                                    value={formData.review}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 text-gray-600 hover:bg-gray-100 py-2 rounded-lg font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-lg"
                                >
                                    Save Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReviews;
