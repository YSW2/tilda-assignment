type Props = {
    disabled?: boolean;
    loading?: boolean;
    type: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
};

const SubmitButton = ({ disabled = false, loading = false, type, children }: Props) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">처리 중...</span>
            ) : (
                children
            )}
        </button>
    );
};

export default SubmitButton;
