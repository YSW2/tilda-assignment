import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { validateEmail, validatePassword, validateName } from '../utils/validation';
import { useState, type ChangeEvent } from 'react';

const SignupPage = () => {
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const getFieldError = (name: string, value: string): string => {
        if (!value) return '';

        if (name === 'email') {
            const result = validateEmail(value);
            return result !== true ? result : '';
        } else if (name === 'name') {
            const result = validateName(value);
            return result !== true ? result : '';
        } else if (name === 'password') {
            const result = validatePassword(value);
            return result !== true ? result : '';
        } else if (name === 'passwordConfirm') {
            return value !== formData.password ? '비밀번호가 일치하지 않습니다' : '';
        }

        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const error = getFieldError(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));

        if (name === 'password' && formData.passwordConfirm) {
            const confirmError = getFieldError('passwordConfirm', formData.passwordConfirm);
            setErrors((prev) => ({ ...prev, passwordConfirm: confirmError }));
        }
    };

    const isFormValid =
        formData.email &&
        formData.name &&
        formData.password &&
        formData.passwordConfirm &&
        !errors.email &&
        !errors.name &&
        !errors.password &&
        !errors.passwordConfirm;

    const handleSubmit = async (e: ChangeEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            await signup({
                email: formData.email,
                name: formData.name,
                password: formData.password,
            });

            alert('회원가입이 완료되었습니다!');
            // navigate('/login');
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

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

                    {/* 이름 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">이름</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.name
                                    ? 'border-gray-300'
                                    : errors.name
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">비밀번호</label>
                        <input
                            type="password"
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
                        <div className="h-4 mt-1">
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* 비밀번호 확인 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded ${
                                !formData.passwordConfirm
                                    ? 'border-gray-300'
                                    : errors.passwordConfirm
                                      ? 'border-red-500'
                                      : 'border-[#5CE65C]'
                            }`}
                        />
                        <div className="h-4 mt-1">
                            {errors.passwordConfirm && (
                                <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
                            )}
                        </div>
                    </div>

                    {/* API 에러
                    {apiError && <p className="text-red-500 text-sm">{apiError}</p>} */}

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '처리 중...' : '회원가입'}
                    </button>

                    <p className="text-center text-sm">
                        이미 계정이 있으신가요?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">
                            로그인
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
