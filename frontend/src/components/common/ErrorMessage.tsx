import { RiErrorWarningFill } from 'react-icons/ri';

type Props = {
    error: string;
};

const ErrorMessage = ({ error }: Props) => {
    return (
        <div className="mt-2 flex items-center gap-1 text-red-600">
            <RiErrorWarningFill color="#e53935" />
            <p className="text-sm">{error}</p>
        </div>
    );
};

export default ErrorMessage;
