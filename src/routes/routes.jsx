import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import TableEmployee from "../pages/Employee/Employee";
import PrivateRoute from "./privateRoute";
import Tracking from "../pages/Tracking/Tracking";
import Leave from "../pages/Leave/Leave";
import Project from "../pages/Project/Project";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

function Routers({ children }) {

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/employees" element={<TableEmployee />} />
                    <Route path="/tracking" element={<Tracking />} />
                    <Route path="/leave" element={<Leave />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/changepassword" element={<ChangePassword />} />
                </Route>
                <Route path="*" element={<p>Page not found 404</p>} />
            </Routes>

        </>
    );
}

export default Routers;