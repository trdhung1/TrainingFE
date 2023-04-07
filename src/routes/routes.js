
import EmployeePage from '../pages/EmployeePage';
import NotFound from '../pages/NotFound';
import AuthPage from '../pages/AuthPage';

export const routes = [
    {
        path: '/',
        component: EmployeePage,
        private: true,
    },
    {

        path: '/employee',
        component: EmployeePage,
        private: true,
    },
    {
        path: '/authentication',
        component: AuthPage,
        private: false,
    },
    {
        path: '*',
        component: NotFound,
        private: false,
    },
];






