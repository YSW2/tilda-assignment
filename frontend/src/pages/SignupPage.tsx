import { Link, useNavigate } from 'react-router-dom';
import useSignupForm from '../hook/useSignupForm';
import { useState, type SubmitEvent } from 'react';
import { signup } from '../api/auth';
import { RiErrorWarningFill } from 'react-icons/ri';

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
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                이메일 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="이메일을 입력하세요"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                                    !formData.email
                                        ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        : errors.email
                                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
                                          : 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50'
                                }`}
                            />
                            {errors.email && (
                                <div className="mt-2 flex items-center gap-1 text-red-600">
                                    <RiErrorWarningFill color="#e53935" />
                                    <p className="text-sm">{errors.email}</p>
                                </div>
                            )}
                        </div>

                        {/* 이름 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                이름 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="이름을 입력하세요"
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

                        {/* 비밀번호 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                비밀번호 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호를 입력하세요"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                                    !formData.password
                                        ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        : errors.password
                                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
                                          : 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50'
                                }`}
                            />
                            {errors.password && (
                                <div className="mt-2 flex items-center gap-1 text-red-600">
                                    <RiErrorWarningFill color="#e53935" />
                                    <p className="text-sm">{errors.password}</p>
                                </div>
                            )}
                        </div>

                        {/* 비밀번호 확인 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                비밀번호 확인 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="비밀번호를 다시 입력하세요"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                                    !formData.passwordConfirm
                                        ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        : errors.passwordConfirm
                                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
                                          : 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50'
                                }`}
                            />
                            {errors.passwordConfirm && (
                                <div className="mt-2 flex items-center gap-1 text-red-600">
                                    <RiErrorWarningFill color="#e53935" />
                                    <p className="text-sm">{errors.passwordConfirm}</p>
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
                                    처리 중...
                                </span>
                            ) : (
                                '회원가입'
                            )}
                        </button>

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
