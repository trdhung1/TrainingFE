import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../uttils/getToken';
import Sidebar from '../layouts/components/Sidebar/Sidebar';

function PrivateRoute() {

    return !getToken() ? <Navigate to="/login" replace /> : <Sidebar> <Outlet /></Sidebar>
}

export default PrivateRoute;