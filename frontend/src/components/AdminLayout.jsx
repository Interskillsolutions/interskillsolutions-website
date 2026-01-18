import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSidebar />
            <div className="flex-1 overflow-auto">
                {children || <Outlet />}
            </div>
        </div>
    );
};

export default AdminLayout;
