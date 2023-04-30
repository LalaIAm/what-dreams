import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './store/features/auth.slice';
import { auth, onAuthStateChanged } from './services/firebase';

const App = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout())
      }
    });
  }, [dispatch]);

  return (
    <Routes>
      {!user ? (
        <Route path='/' element={<Auth />} />
      ) : (
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
