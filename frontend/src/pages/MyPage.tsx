import EditNameSection from '../components/mypage/EditNameSection';
import EditPasswordSection from '../components/mypage/EditPasswordSection';
import { useAuthStore } from '../store/authStore';

const MyPage = () => {
    const { user } = useAuthStore();

    return (
        <div className="bg-gray-50 min-h-full p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">마이페이지</h1>
                <p className="text-sm text-gray-500">
                    계정 정보를 관리하고 비밀번호를 변경할 수 있습니다.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EditNameSection />
                <EditPasswordSection />
            </div>
        </div>
    );
};

export default MyPage;
