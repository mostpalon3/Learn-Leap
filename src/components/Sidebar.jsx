import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import maleProfile from "../assets/images/male.png";
import { 
  Home, 
  Info, 
  BookOpen, 
  FileText, 
  Users, 
  User, 
  LogIn, 
  LogOut, 
  UserPlus,
  Menu,
  X,
  Brain,
  Sparkles
} from "lucide-react";
import logo from "../assets/images/profile-vector.png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  
  // set visible to false if url is /sigup, /login, /chat, /quiz
  useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/chat' || location.pathname === '/quiz') {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
    toast.success('Logout successful!')
  };

  const isActive = (path) => {
    return location.pathname === path ? 
      "bg-[#28595a] text-white font-medium" : 
      "text-[#28595a] hover:bg-[#b8e4bd] font-medium";
  };

  // For mobile toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className={`fixed top-4 left-4 z-50 p-2 rounded-full bg-[#28595a] text-white md:hidden ${visible ? 'block' : 'hidden'}`}
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Sidebar */}
      <aside 
        className={`left-0 top-0 w-[15%] h-full bg-[#dbf0dd] fixed shadow-lg z-20 transition-transform duration-300 
          ${visible ? 'translate-x-0' : '-translate-x-full'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex justify-center items-center py-8 border-b border-[#b8e4bd]">
            <Link to="/" className="flex flex-col items-center">
              <img src={logo} alt="Learn Leap Logo" className="w-16 h-16 object-contain" />
              <h1 className="text-[#28595a] font-bold text-xl mt-2">Learn Leap</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/')}`}
                >
                  <Home size={20} className="mr-3" />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link 
                  to="/about" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/about')}`}
                >
                  <Info size={20} className="mr-3" />
                  <span>About Us</span>
                </Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link 
                      to="/courses" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/courses')}`}
                    >
                      <BookOpen size={20} className="mr-3" />
                      <span>Courses</span>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/pdf-to-quiz" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/pdf-to-quiz')}`}
                    >
                      <Sparkles size={20} className="mr-3" />
                      <span>AI Quiz Generator</span>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/feed" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/feed')}`}
                    >
                      <Users size={20} className="mr-3" />
                      <span>Feed</span>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/profile" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/profile')}`}
                    >
                      <User size={20} className="mr-3" />
                      <span>Profile</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/login')}`}
                    >
                      <LogIn size={20} className="mr-3" />
                      <span>Login</span>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/signup" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/signup')}`}
                    >
                      <UserPlus size={20} className="mr-3" />
                      <span>Signup</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Footer Section */}
                {user && (
                <div className="p-4 border-t border-[#b8e4bd]">
                  <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                    src={maleProfile} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${user.email?.charAt(0)}&background=28595a&color=fff`;
                    }}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-[#28595a] truncate max-w-[120px]">
                    {user.email || 'User'}
                    </p>
                  </div>
                  </div>
                  <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-white text-[#28595a] hover:bg-[#ff8400] hover:text-white transition-colors font-medium"
                  >
                  <LogOut size={18} className="mr-2" />
                  Logout
                  </button>
                </div>
                )}
              </div>
              </aside>

              {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
}

export default Sidebar;