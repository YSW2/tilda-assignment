import { useAuthStore } from '../store/authStore';
import { validateName } from '../utils/validation';
import { useState, type ChangeEvent } from 'react';

const useEditNameForm = () => {
    const user = useAuthStore((state) => state.user);
    const [formData, setFormData] = useState({
        name: user?.name || '',
    });

    const [errors, setErrors] = useState({
        name: '',
    });

    const getFieldError = (name: string, value: string): string => {
        if (!value) return '';

        if (name === 'name') {
            const result = validateName(value);
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

    const isFormValid = formData.name && !errors.name;

    return { handleChange, formData, errors, isFormValid };
};

export default useEditNameForm;
