import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const RequireAuth = ({ allowedRoles }) => {
    const token = useStoreState((state) => state.token);
    const location = useLocation();

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
