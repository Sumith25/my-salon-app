import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div
                className="text-white font-bold text-xl cursor-pointer"
                onClick={() => navigate('/')}
            >
                My Salon App
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                <Link to="/services" className="text-white hover:text-gray-300">Services</Link>

                {!user && (
                    <>
                        <Link to="/register" className="text-white hover:text-gray-300">Customer Registration</Link>
                        <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                    </>
                )}

                {user?.role === 'admin' && (
                    <>
                        <Link to="/admin" className="text-white hover:text-gray-300">Admin Dashboard</Link>
                        <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                    </>
                )}

                {user?.role === 'customer' && (
                    <>
                        <Link to="/customer" className="text-white hover:text-gray-300">Customer Dashboard</Link>
                        <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
