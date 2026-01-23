import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaStar, FaBook, FaChartLine, FaEnvelopeOpenText, FaLayerGroup, FaComments, FaUserCircle } from 'react-icons/fa';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AdminSidebar = () => {
    const { logout, admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const linkClasses = ({ isActive }) =>
        `flex items-center p-3 rounded transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700 text-gray-200'}`;

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-center text-primary">
                {admin?.role === 'admin' ? 'Admin Panel' : 'Staff Panel'}
            </h2>
            <nav className="space-y-2 flex-1">
                <NavLink to="/admin/dashboard" className={linkClasses}>
                    <FaTachometerAlt className="mr-3" /> Dashboard
                </NavLink>
                <NavLink to="/admin/categories" className={linkClasses}>
                    <FaLayerGroup className="mr-3" /> Categories
                </NavLink>

                <div className="pt-4 border-t border-gray-700 my-2"></div>
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Content</p>

                <NavLink to="/admin/courses" className={linkClasses}>
                    <FaBook className="mr-3" /> Courses
                </NavLink>
                <NavLink to="/admin/reviews" className={linkClasses}>
                    <FaStar className="mr-3" /> Reviews
                </NavLink>
                <NavLink to="/admin/partners" className={linkClasses}>
                    <FaUsers className="mr-3" /> Partners
                </NavLink>

                <div className="pt-4 border-t border-gray-700 my-2"></div>
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Management</p>

                <NavLink to="/admin/leads" className={linkClasses}>
                    <FaEnvelopeOpenText className="mr-3" /> Leads
                </NavLink>
                <NavLink to="/admin/chat" className={linkClasses}>
                    <FaComments className="mr-3" /> Team Connect
                </NavLink>


                <NavLink to="/admin/profile" className={linkClasses}>
                    <FaUserCircle className="mr-3" /> My Profile
                </NavLink>

                {admin && admin.role === 'admin' && (
                    <NavLink to="/admin/users" className={linkClasses}>
                        <FaUsers className="mr-3" /> Staff
                    </NavLink>
                )}

            </nav>

            <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 hover:bg-red-600 rounded transition-colors mt-4"
            >
                <FaSignOutAlt className="mr-3" /> Logout
            </button>

        </div >
    );
};

export default AdminSidebar;
