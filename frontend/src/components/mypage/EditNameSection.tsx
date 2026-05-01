import { useState, type SubmitEvent } from 'react';
import useEditNameForm from '../../hook/useEditNameForm';
import { useAuthStore } from '../../store/authStore';
import { patchName } from '../../api/auth';
import { RiErrorWarningFill } from 'react-icons/ri';

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
                                <RiErrorWarningFill color="#e53935" />
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
