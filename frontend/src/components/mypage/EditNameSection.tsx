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
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
            {/* 헤더 */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    내 정보 수정
                </h2>
                <p className="text-sm text-gray-500 mt-1">이름을 변경할 수 있습니다.</p>
            </div>

            {/* 본문 */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="p-6 space-y-5 flex-1">
                    {/* 이름 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="변경할 이름을 입력하세요"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                                !formData.name
                                    ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    : errors.name
                                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
                                      : 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50'
                            }`}
                        />
                        {errors.name && (
                            <div className="mt-2 flex items-center gap-1 text-red-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-sm">{errors.name}</p>
                            </div>
                        )}
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            이메일 <span className="text-gray-400 text-xs">(변경 불가)</span>
                        </label>
                        <input
                            disabled
                            type="email"
                            name="email"
                            value={user?.email || ''}
                            className="w-full px-4 py-2.5 border rounded-md bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* 푸터 */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                처리 중...
                            </span>
                        ) : (
                            '정보 수정'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditNameSection;
