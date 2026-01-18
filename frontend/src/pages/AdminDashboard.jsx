

const AdminDashboard = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Total Leads</h3>
                    <p className="text-3xl font-bold text-blue-600">Loading...</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Total Courses</h3>
                    <p className="text-3xl font-bold text-green-600">Loading...</p>
                </div>
                {/* Add more widgets */}
            </div>
        </div>
    );
};

export default AdminDashboard;
