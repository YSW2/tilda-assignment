import { Link, useNavigate } from 'react-router-dom';
import useSignupForm from '../hook/useSignupForm';
import { useState, type SubmitEvent } from 'react';
import { signup } from '../api/auth';
import ValidatedInput from '../components/common/ValidateInput';
import SubmitButton from '../components/common/SubmitButton';
import FormField from '../components/common/FormField';

const SignupPage = () => {
    const navigate = useNavigate();

    const { handleChange, formData, errors, isFormValid } = useSignupForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            await signup({
                email: formData.email,
                name: formData.name,
                password: formData.password,
            });

            alert('회원가입이 완료되었습니다!');
            navigate('/login');
        } catch (error: any) {
            const apiError =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                '회원가입에 실패했습니다';

            alert(apiError);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
                {/* 헤더 */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center">
                        회원가입
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        새 계정을 만들어 서비스를 시작하세요
                    </p>
                </div>

                {/* 본문 */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                    <div className="p-6 space-y-5 flex-1">
                        {/* 이메일 */}
                        <FormField label="이메일" required error={errors.email}>
                            <ValidatedInput
                                type="email"
                                name="email"
                                placeholder="이메일을 입력하세요"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                        </FormField>

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

                        {/* 비밀번호 */}
                        <FormField label="비밀번호" required error={errors.password}>
                            <ValidatedInput
                                type="password"
                                name="currentPassword"
                                placeholder="비밀번호를 입력하세요"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </FormField>

                        {/* 비밀번호 확인 */}
                        <FormField label="비밀번호 확인" required error={errors.passwordConfirm}>
                            <ValidatedInput
                                type="password"
                                name="passwordConfirm"
                                placeholder="비밀번호를 다시 입력하세요"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                error={errors.passwordConfirm}
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
                            회원가입
                        </SubmitButton>

                        <p className="text-center text-sm mt-4 text-gray-600">
                            이미 계정이 있으신가요?{' '}
                            <Link
                                to="/login"
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                로그인
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
