import { useState, type SubmitEvent } from 'react';
import { patchPassword } from '../../api/auth';
import useEditPasswordForm from '../../hook/useEditPasswordForm';

const EditPasswordSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleChange, formData, errors, isFormValid } = useEditPasswordForm();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            await patchPassword(formData.currentPassword, formData.newPassword);
            alert('비밀번호 변경이 완료되었습니다');
        } catch (error: any) {
            const apiError =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                '비밀번호 변경에 실패했습니다';

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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    비밀번호 변경
                </h2>
                <p className="text-sm text-gray-500 mt-1">계정 보안을 위해 비밀번호를 변경하세요.</p>
            </div>

            {/* 본문 */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="p-6 space-y-5 flex-1">
                    {/* 현재 비밀번호 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            현재 비밀번호 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="현재 비밀번호를 입력하세요"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* 새 비밀번호 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            새 비밀번호 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="새 비밀번호를 입력하세요"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                                !formData.newPassword
                                    ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    : errors.newPassword
                                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
                                      : 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50'
                            }`}
                        />
                        {errors.newPassword && (
                            <div className="mt-2 flex items-center gap-1 text-red-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-sm">{errors.newPassword}</p>
                            </div>
                        )}
                    </div>

                    {/* 새 비밀번호 확인*/}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            새 비밀번호 확인 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="newPasswordConfirm"
                            placeholder="새 비밀번호를 다시 입력하세요"
                            value={formData.newPasswordConfirm}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                                !formData.newPasswordConfirm
                                    ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    : errors.newPasswordConfirm
                                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
                                      : 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50'
                            }`}
                        />
                        {errors.newPasswordConfirm && (
                            <div className="mt-2 flex items-center gap-1 text-red-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-sm">{errors.newPasswordConfirm}</p>
                            </div>
                        )}
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
                            '비밀번호 변경'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPasswordSection;
