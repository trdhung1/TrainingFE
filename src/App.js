import {  routes } from './routes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginWidthLocalstorage } from './store/authSlice';
import { useDispatch } from 'react-redux';

function App () {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const storedUser = JSON.parse(localStorage.getItem('User'));

  useEffect(() => {
    if (storedUser && !isAuthenticated) {
      dispatch(loginWidthLocalstorage(storedUser));
    }
  }, [dispatch, isAuthenticated, storedUser]);

  
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element = {route.private && !isAuthenticated ? <Navigate to="/authentication" /> : <route.component />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;