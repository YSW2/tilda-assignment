import { useState, type ChangeEvent } from 'react';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { validateEmail, validatePassword } from '../utils/validation';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const authLogin = useAuthStore((state) => state.login);

    const getFieldError = (name: string, value: string): string => {
        if (!value) return '';

        if (name === 'email') {
            const result = validateEmail(value);
            return result !== true ? result : '';
        } else if (name === 'password') {
            const result = validatePassword(value);
            return result !== true ? result : '';
        }

        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const error = getFieldError(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: ChangeEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const response = await login({
                email: formData.email,
                password: formData.password,
            });

            // authStore에 로그인 정보 저장
            authLogin(response.token, response.user);

            alert('로그인 성공!');
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

    const isFormValid = formData.email && formData.password && !errors.email && !errors.password;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">이메일</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.email
                                    ? 'border-gray-300'
                                    : errors.email
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">비밀번호</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded ${
                                    !formData.password
                                        ? 'border-gray-300'
                                        : errors.password
                                          ? 'border-red-500'
                                          : 'border-[#5CE65C]'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="h-4 mt-1">
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '처리 중...' : '로그인'}
                    </button>

                    <p className="text-center text-sm">
                        계정이 없으신가요?{' '}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            회원가입
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
