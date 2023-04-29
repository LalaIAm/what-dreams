import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { useGetUser } from './hooks';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [{ isLoading, isError }, dispatch] = useGetUser();

  return (
    <Routes>
      <Route path='/' element={<Auth dispatch={dispatch} />} />
      <Route path='/app' element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
