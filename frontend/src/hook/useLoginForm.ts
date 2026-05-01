import { validateEmail, validatePassword } from '../utils/validation';
import { useState, type ChangeEvent } from 'react';

const useLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const error = getFieldError(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const isFormValid = formData.email && formData.password && !errors.email && !errors.password;

    return { handleChange, formData, errors, isFormValid };
};

export default useLoginForm;
