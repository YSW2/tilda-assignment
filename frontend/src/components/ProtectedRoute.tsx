import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    console.log(isAuthenticated);

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    } else if (isAuthenticated === true) return children;
};
export default ProtectedRoute;
