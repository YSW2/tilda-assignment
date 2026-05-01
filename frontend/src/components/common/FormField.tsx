import ErrorMessage from './ErrorMessage';

type Props = {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
};

const FormField = ({ label, required, error, children }: Props) => {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {error && <ErrorMessage error={error} />}
        </div>
    );
};

export default FormField;
