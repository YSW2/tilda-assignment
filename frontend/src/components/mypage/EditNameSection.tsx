import { useState, type SubmitEvent } from 'react';
import useEditNameForm from '../../hook/useEditNameForm';
import { useAuthStore } from '../../store/authStore';
import { patchName } from '../../api/auth';
import SubmitButton from '../common/SubmitButton';
import FormField from '../common/FormField';
import ValidatedInput from '../common/ValidateInput';
import toast from 'react-hot-toast';

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

            toast.success('회원정보 변경이 완료되었습니다');
        } catch (error: any) {
            const apiError =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                '회원정보 변경에 실패했습니다';

            toast.error(apiError);
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
                    <FormField label="이름" required error={errors.name}>
                        <ValidatedInput
                            type="text"
                            name="name"
                            placeholder="변경할 이름을 입력하세요"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                    </FormField>

                    {/* 이메일 */}
                    <FormField label="이메일">
                        <ValidatedInput
                            disabled
                            type="email"
                            name="email"
                            value={user?.email || ''}
                        />
                    </FormField>
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
