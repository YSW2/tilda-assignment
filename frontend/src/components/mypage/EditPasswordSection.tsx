import { useState, type SubmitEvent } from 'react';
import { patchPassword } from '../../api/auth';
import useEditPasswordForm from '../../hook/useEditPasswordForm';
import { RiErrorWarningFill } from 'react-icons/ri';
import ValidatedInput from '../common/ValidateInput';
import SubmitButton from '../common/SubmitButton';

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
                    비밀번호 변경
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    계정 보안을 위해 비밀번호를 변경하세요.
                </p>
            </div>

            {/* 본문 */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="p-6 space-y-5 flex-1">
                    {/* 현재 비밀번호 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            현재 비밀번호 <span className="text-red-500">*</span>
                        </label>
                        <ValidatedInput
                            type="password"
                            name="currentPassword"
                            placeholder="현재 비밀번호를 입력하세요"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {/* 새 비밀번호 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            새 비밀번호 <span className="text-red-500">*</span>
                        </label>
                        <ValidatedInput
                            type="password"
                            name="newPassword"
                            placeholder="새 비밀번호를 입력하세요"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
                        />
                        {errors.newPassword && (
                            <div className="mt-2 flex items-center gap-1 text-red-600">
                                <RiErrorWarningFill color="#e53935" />
                                <p className="text-sm">{errors.newPassword}</p>
                            </div>
                        )}
                    </div>

                    {/* 새 비밀번호 확인*/}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            새 비밀번호 확인 <span className="text-red-500">*</span>
                        </label>
                        <ValidatedInput
                            type="password"
                            name="newPasswordConfirm"
                            placeholder="새 비밀번호를 다시 입력하세요"
                            value={formData.newPasswordConfirm}
                            onChange={handleChange}
                            error={errors.newPasswordConfirm}
                        />
                        {errors.newPasswordConfirm && (
                            <div className="mt-2 flex items-center gap-1 text-red-600">
                                <RiErrorWarningFill color="#e53935" />
                                <p className="text-sm">{errors.newPasswordConfirm}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 푸터 */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <SubmitButton
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        loading={isSubmitting}
                    >
                        비밀번호 변경
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default EditPasswordSection;
