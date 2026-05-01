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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">비밀번호 변경</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 현재 비밀번호 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">현재 비밀번호</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded border-gray-300`}
                            />
                        </div>
                        <div className="h-4 mt-1" />
                    </div>

                    {/* 새 비밀번호 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">새 비밀번호</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.newPassword
                                    ? 'border-gray-300'
                                    : errors.newPassword
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm">{errors.newPassword}</p>
                            )}
                        </div>{' '}
                    </div>

                    {/* 새 비밀번호 확인*/}
                    <div>
                        <label className="block text-sm font-medium mb-1">새 비밀번호</label>
                        <input
                            type="password"
                            name="newPasswordConfirm"
                            value={formData.newPasswordConfirm}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.newPasswordConfirm
                                    ? 'border-gray-300'
                                    : errors.newPasswordConfirm
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.newPasswordConfirm && (
                                <p className="text-red-500 text-sm">{errors.newPasswordConfirm}</p>
                            )}
                        </div>{' '}
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

export default EditPasswordSection;
