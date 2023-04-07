import {  routes } from './routes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App () {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log('isAuthenticated', isAuthenticated);
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
            {...(route.private && !isAuthenticated ? { element: <Navigate to="/authentication" /> } : {
             
                  
            })}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;