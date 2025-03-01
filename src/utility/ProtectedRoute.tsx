import { Navigate } from "react-router-dom";
import { checkAuth } from "./authUtility";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const auth = checkAuth();
    
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}