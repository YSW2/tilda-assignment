import { useState } from 'react';
import { validatePassword } from '../utils/validation';

const useEditPasswordForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const getFieldError = (name: string, value: string, currentFormData = formData): string => {
        if (!value) return '';

        if (name === 'currentPassword') {
            const result = validatePassword(value);
            return result !== true ? result : '';
        } else if (name === 'newPassword') {
            const result = validatePassword(value);
            if (result !== true) return result;

            if (currentFormData.currentPassword && value === currentFormData.currentPassword) {
                return '현재 비밀번호와 다른 비밀번호를 입력하세요';
            }

            return '';
        } else if (name === 'newPasswordConfirm') {
            return value !== currentFormData.newPassword ? '비밀번호가 일치하지 않습니다' : '';
        }

        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        const error = getFieldError(name, value, updatedFormData);
        setErrors((prev) => ({ ...prev, [name]: error }));

        if (name === 'newPassword' && updatedFormData.newPasswordConfirm) {
            const confirmError =
                updatedFormData.newPasswordConfirm !== value ? '비밀번호가 일치하지 않습니다' : '';
            setErrors((prev) => ({ ...prev, newPasswordConfirm: confirmError }));
        }

        if (name === 'currentPassword' && updatedFormData.newPassword) {
            const result = validatePassword(updatedFormData.newPassword);
            let newPasswordError = result !== true ? result : '';

            if (!newPasswordError && value === updatedFormData.newPassword) {
                newPasswordError = '현재 비밀번호와 다른 비밀번호를 입력하세요';
            }

            setErrors((prev) => ({ ...prev, newPassword: newPasswordError }));
        }
    };

    const isFormValid =
        formData.currentPassword &&
        formData.newPassword &&
        formData.newPasswordConfirm &&
        !errors.currentPassword &&
        !errors.newPassword &&
        !errors.newPasswordConfirm;

    return { handleChange, formData, errors, isFormValid };
};
export default useEditPasswordForm;
