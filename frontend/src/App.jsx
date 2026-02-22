import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './pages/AdminLogin';
import StaffRegister from './pages/StaffRegister';
import StaffProfile from './pages/StaffProfile';
import TeamConnect from './pages/TeamConnect';
import AdminDashboard from './pages/AdminDashboard';
import AdminLeads from './pages/AdminLeads';
import AdminReviews from './pages/AdminReviews';
import AdminPartners from './pages/AdminPartners';
import AdminStaff from './pages/AdminStaff';
import AdminCategories from './pages/AdminCategories';
import AdminCourses from './pages/AdminCourses';
import AdminCourseForm from './pages/AdminCourseForm';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import GalleryPage from './pages/GalleryPage';
import GalleryDetail from './pages/GalleryDetail';
import AdminGallery from './pages/AdminGallery';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/courses/:id" element={<Layout><CourseDetail /></Layout>} />
          <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
          <Route path="/gallery/:id" element={<Layout><GalleryDetail /></Layout>} />

          {/* Admin Routes */}
          <Route path="/staff-portal/register" element={<StaffRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="profile" element={<StaffProfile />} />
            <Route path="chat" element={<TeamConnect />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="users" element={<AdminStaff />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="courses/add" element={<AdminCourseForm />} />
            <Route path="courses/edit/:id" element={<AdminCourseForm />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
