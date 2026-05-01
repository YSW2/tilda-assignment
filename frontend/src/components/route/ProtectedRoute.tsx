import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';

type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    } else if (isAuthenticated === true) return children;
};
export default ProtectedRoute;
