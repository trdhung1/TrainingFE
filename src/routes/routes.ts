
import EmployeePage from '../pages/EmployeePage';
import NotFound from '../pages/NotFound';
import AuthPage from '../pages/AuthPage';

interface IRoute {
    path: string;
    component: any;
    private: boolean;
    title?: string;
}
export const routes:IRoute[] = [
    {
        path: '/',
        component: EmployeePage,
        private: true,
    },
    {

        path: '/employee',
        component: EmployeePage,
        private: true,
        title: 'Employee Management'
    },
    {
        path: '/authentication',
        component: AuthPage,
        private: false,
        title: 'Authentication'
    },
    {
        path: '*',
        component: NotFound,
        private: false,
        title: 'Not Found'
    }
];






