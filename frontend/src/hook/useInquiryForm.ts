import { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
    validateInquiryName,
    validateEmail,
    validateCompany,
    validateContent,
} from '../utils/validation';

const useInquiryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        content: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        company: '',
        content: '',
    });

    const getFieldError = (name: string, value: string): string => {
        if (!value) return '';

        if (name === 'name') {
            const result = validateInquiryName(value);
            return result !== true ? result : '';
        } else if (name === 'email') {
            const result = validateEmail(value);
            return result !== true ? result : '';
        } else if (name === 'company') {
            const result = validateCompany(value);
            return result !== true ? result : '';
        } else if (name === 'content') {
            const result = validateContent(value);
            return result !== true ? result : '';
        }

        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const error = getFieldError(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const isFormValid =
        formData.name &&
        formData.email &&
        formData.content &&
        !errors.name &&
        !errors.email &&
        !errors.company &&
        !errors.content;

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            company: '',
            content: '',
        });
        setErrors({
            name: '',
            email: '',
            company: '',
            content: '',
        });
    };

    return { handleChange, formData, errors, isFormValid, resetForm };
};

export default useInquiryForm;
