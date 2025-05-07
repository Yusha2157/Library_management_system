import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({children , adminOnly}) => {
    const {user} = useAuth();

    if (!user) return <Navigate to="/login" />;
    if (adminOnly && !user.isAdmin) return <Navigate to="/" />; 

    return children;
};

export default ProtectedRoute;