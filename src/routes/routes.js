
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

 export const publicRoutes = [
    {
        path: '/',
        component: HomePage,
        exact: true,
    },
    {
        path: '/login',
        component: LoginPage,
        exact: true,
    }
];

export const privateRoutes = [
    {
        path: '/',
        component: HomePage,
        exact: true,
        private : true,
    }
];
