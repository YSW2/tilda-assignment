import { useState, type SubmitEvent } from 'react';
import useEditNameForm from '../../hook/useEditNameForm';
import { useAuthStore } from '../../store/authStore';
import { patchName } from '../../api/auth';
import ValidatedInput from '../common/ValidateInput';
import SubmitButton from '../common/SubmitButton';
import ErrorMessage from '../common/ErrorMessage';

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
                        <ValidatedInput
                            type="text"
                            name="name"
                            placeholder="변경할 이름을 입력하세요"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        {errors.name && <ErrorMessage error={errors.name} />}
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            이메일 <span className="text-gray-400 text-xs">(변경 불가)</span>
                        </label>
                        <ValidatedInput
                            disabled
                            type="email"
                            name="email"
                            value={user?.email || ''}
                        />
                    </div>
                </div>

                {/* 푸터 */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <SubmitButton
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        loading={isSubmitting}
                    >
                        정보 수정
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default EditNameSection;
