import { useState, type SubmitEvent } from 'react';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import useLoginForm from '../hook/useLoginForm';
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleChange, formData, errors, isFormValid } = useLoginForm();

    const authLogin = useAuthStore((state) => state.login);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const res = await login({
                email: formData.email,
                password: formData.password,
            });

            authLogin(res.token, res.user);
            window.location.href = '/';
        } catch (error: any) {
            const apiError =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                '로그인에 실패했습니다';

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
                        로그인
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        계정에 로그인하여 서비스를 이용하세요
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

                        {/* 비밀번호 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                비밀번호 <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
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
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="mt-2 flex items-center gap-1 text-red-600">
                                    <RiErrorWarningFill color="#e53935" />
                                    <p className="text-sm">{errors.password}</p>
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
                                '로그인'
                            )}
                        </button>

                        <p className="text-center text-sm mt-4 text-gray-600">
                            계정이 없으신가요?{' '}
                            <Link
                                to="/signup"
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                회원가입
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
