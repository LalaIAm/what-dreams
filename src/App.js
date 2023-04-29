import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';



const App = () => {
  

  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/app' element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
