import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import TableEmployee from "../pages/Employee/Employee";
import PrivateRoute from "./privateRoute";

function Routers({ children }) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="*" element={<TableEmployee />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path="/employees" element={<TableEmployee />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routers;