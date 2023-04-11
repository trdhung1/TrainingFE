import { routes } from './routes';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useEffect } from 'react';
import { RootState } from './store/store';
import { useLocation } from 'react-router-dom';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();


  const currentRoute = routes.find((route) => route.path === location.pathname);

  useEffect(() => {
    document.title = currentRoute?.title || 'Employee Management App';
  }, [currentRoute]);

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.private && !isAuthenticated ? (
              <Navigate to="/authentication" />
            ) : (
              <route.component />
            ) 
          }
    
        />
      ))}
    
    </Routes>
  );
}

export default App;
