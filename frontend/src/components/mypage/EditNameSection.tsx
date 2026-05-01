import { useState, type SubmitEvent } from 'react';
import useEditNameForm from '../../hook/useEditNameForm';
import { useAuthStore } from '../../store/authStore';
import { patchName } from '../../api/auth';

const EditNameSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleChange, formData, errors, isFormValid } = useEditNameForm();
    const { user, edit } = useAuthStore();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            const res = await patchName(formData.name);
            edit(res.user.name, res.user.email);

            alert('회원정보 변경이 완료되었습니다');
        } catch (error: any) {
            const apiError =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                '회원정보 변경에 실패했습니다';

            alert(apiError);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">내 정보 수정</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 이름 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">이름</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded ${
                                    !formData.name
                                        ? 'border-gray-300'
                                        : errors.name
                                          ? 'border-red-500'
                                          : 'border-[#5CE65C]'
                                }`}
                            />
                        </div>
                        <div className="h-4 mt-1">
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">이메일</label>
                        <input
                            disabled
                            type="email"
                            name="email"
                            value={user?.email || ''}
                            className={`w-full px-3 py-2 border rounded bg-gray-100 border-gray-200 text-gray-400`}
                        />
                        <div className="h-4 mt-1" />
                    </div>

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '처리 중...' : '정보 수정'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditNameSection;
