import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';

type Props = {
    name: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
};

const ValidatedInput = ({
    name,
    value,
    onChange,
    error,
    type = 'text',
    placeholder,
    disabled = false,
}: Props) => {
    const borderClass = disabled
        ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
        : !value
          ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          : error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50'
            : 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50';

    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all ${borderClass}`}
            />
        </div>
    );
};

export default ValidatedInput;
