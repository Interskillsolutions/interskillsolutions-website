import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { toast } from 'react-toastify';
import { FaTrash, FaCheck, FaEye, FaUndo, FaTimes, FaHistory } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import * as XLSX from 'xlsx';

const AdminLeads = () => {
    const [leads, setLeads] = useState([]);
    const { admin, token } = useContext(AuthContext); // Use token exposed
    const [view, setView] = useState('active'); // 'active' or 'deleted'
    const [loading, setLoading] = useState(true);

    // Modal State
    const [showRemarkModal, setShowRemarkModal] = useState(false);
    const [selectedLeadId, setSelectedLeadId] = useState(null);
    const [remarkText, setRemarkText] = useState('');
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedHistoryLead, setSelectedHistoryLead] = useState(null);

    useEffect(() => {
        if (admin) {
            fetchLeads();
        }
    }, [admin, view]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    view: view
                }
            };
            const { data } = await axios.get(`${API_URL}/api/leads`, config);
            setLeads(data);
        } catch (error) {
            toast.error('Error fetching leads');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status, remark = '') => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${API_URL}/api/leads/${id}`, { status, remark }, config);
            toast.success('Lead updated');
            fetchLeads();
            setShowRemarkModal(false);
            setRemarkText('');
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const handleDelete = async (id, isPermanent = false) => {
        if (!window.confirm(isPermanent ? 'PERMANENTLY DELETE? This cannot be undone.' : 'Move to trash?')) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: { type: isPermanent ? 'permanent' : 'soft' }
            };
            await axios.delete(`${API_URL}/api/leads/${id}`, config);
            toast.success(isPermanent ? 'Permanently Deleted' : 'Moved to Trash');
            fetchLeads();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Delete failed');
        }
    };

    const openRemarkModal = (id) => {
        setSelectedLeadId(id);
        setShowRemarkModal(true);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(leads.map(l => ({
            Date: new Date(l.createdAt).toLocaleDateString(),
            Name: l.name,
            Email: l.email,
            Phone: l.phone,
            Interest: l.interest,
            Source: l.source,
            Status: l.status,
            LatestRemark: l.remarks?.length > 0 ? l.remarks[l.remarks.length - 1].text : '',
            DeletedBy: l.deletedBy ? l.deletedBy.username : ''
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
        XLSX.writeFile(workbook, "Interskill_Leads.xlsx");
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    {view === 'deleted' ? 'Deleted Leads (Bin)' : 'Leads Management'}
                </h1>
                <div className="flex gap-4">
                    {admin?.role === 'admin' && (
                        <button
                            onClick={() => setView(view === 'active' ? 'deleted' : 'active')}
                            className={`px-4 py-2 rounded transition-colors ${view === 'active' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            {view === 'active' ? 'View Bin' : 'View Active Leads'}
                        </button>
                    )}
                    <button
                        onClick={exportToExcel}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Export to Excel
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Interest</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                {view === 'deleted' && <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deleted By</th>}
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-gray-50">
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="font-semibold text-gray-900">{lead.name}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p>{lead.email}</p>
                                        <p className="text-gray-500 text-xs">{lead.phone}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {lead.interest} <br />
                                        <span className="text-xs text-gray-400">{lead.source}</span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full 
                                            ${lead.status === 'Handled' ? 'bg-blue-100 text-blue-900' :
                                                lead.status === 'Completed' ? 'bg-green-100 text-green-900' : 'bg-yellow-100 text-yellow-900'}`}>
                                            <span className="relative">{lead.status}</span>
                                        </span>
                                        {lead.remarks && lead.remarks.length > 0 && (
                                            <div className="mt-2 text-xs text-gray-500 italic max-w-xs truncate" title={lead.remarks[lead.remarks.length - 1].text}>
                                                Last: "{lead.remarks[lead.remarks.length - 1].text}"
                                            </div>
                                        )}
                                    </td>
                                    {view === 'deleted' && (
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-red-600">
                                            {lead.deletedBy?.username || 'Unknown'}
                                        </td>
                                    )}
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex gap-2">
                                            {view === 'active' && (
                                                <>
                                                    <button
                                                        onClick={() => openRemarkModal(lead._id)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                                        title="Mark Handled / Add Remark"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedHistoryLead(lead); setShowHistoryModal(true); }}
                                                        className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                                                        title="View History"
                                                    >
                                                        <FaHistory />
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedHistoryLead(lead); setShowHistoryModal(true); }}
                                                        className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                                                        title="View History"
                                                    >
                                                        <FaHistory />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(lead._id, false)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                                        title="Delete (Trash)"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </>
                                            )}
                                            {view === 'deleted' && admin?.role === 'admin' && (
                                                <button
                                                    onClick={() => handleDelete(lead._id, true)}
                                                    className="bg-red-800 text-white p-2 rounded hover:bg-red-900 font-bold"
                                                    title="Permanently Delete"
                                                >
                                                    Delete Forever
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <div className="p-8 text-center">Loading...</div>}
                    {!loading && leads.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            {view === 'active' ? 'No active leads found.' : 'Bin is empty.'}
                        </div>
                    )}
                </div>
            </div>

            {/* Remark Modal */}
            {showRemarkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Mark Lead as Handled</h2>
                        <textarea
                            className="w-full p-2 border rounded mb-4 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter remarks (e.g., Called user, sent brochure...)"
                            value={remarkText}
                            onChange={(e) => setRemarkText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowRemarkModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(selectedLeadId, 'Handled', remarkText)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                disabled={!remarkText.trim()}
                            >
                                Submit Remark
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {showHistoryModal && selectedHistoryLead && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl max-h-[80vh] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Lead History</h2>
                            <button onClick={() => setShowHistoryModal(false)} className="text-gray-500 hover:text-gray-700 font-bold text-xl">&times;</button>
                        </div>
                        <div className="overflow-y-auto flex-1 pr-2">
                            {selectedHistoryLead.remarks && selectedHistoryLead.remarks.length > 0 ? (
                                <ul className="space-y-4">
                                    {selectedHistoryLead.remarks.slice().reverse().map((remark, index) => (
                                        <li key={index} className="bg-gray-50 p-3 rounded border border-gray-200">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-blue-600 text-sm">{remark.name || 'Unknown Staff'}</span>
                                                <span className="text-xs text-gray-500">{new Date(remark.date).toLocaleString()}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm whitespace-pre-wrap">{remark.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No history available for this lead.</p>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                            <button
                                onClick={() => setShowHistoryModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLeads;
