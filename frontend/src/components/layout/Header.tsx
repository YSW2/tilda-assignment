import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 m-0">Tilda Assignment</h1>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-gray-500 text-sm">{user?.name}님</span>
                        <button
                            onClick={() => navigate('/mypage')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            마이페이지
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                        로그인
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
