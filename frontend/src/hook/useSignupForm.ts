import { validateEmail, validatePassword, validateName } from '../utils/validation';
import { useState, type ChangeEvent } from 'react';

const useSignupForm = () => {
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    return { handleChange, formData, errors, isFormValid };
};

export default useSignupForm;
