import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../uttils/getToken';

function PrivateRoute() {

    return !getToken() ? <Navigate to="/login" replace /> : <Outlet />;
}

export default PrivateRoute;