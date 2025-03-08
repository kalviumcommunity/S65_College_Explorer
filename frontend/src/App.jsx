import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import AddCollege from './pages/AddCollege';
import EditCollege from './pages/EditCollege'; 
import ProtectedRoute from './components/ProtectedRoute';
import CollegeDetail from './pages/CollegeDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/college/:id',
    element: <CollegeDetail />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin/register',
    element: <AdminRegister />
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/add-college',
    element: (
      <ProtectedRoute>
        <AddCollege />
      </ProtectedRoute>
    )
  },
  // Add this new route
  {
    path: '/admin/edit-college/:id',
    element: (
      <ProtectedRoute>
        <EditCollege />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    )
  }
]);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;