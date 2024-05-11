import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import ClientLayout from './layouts/Client';
import Login from './layouts/Login'
import { useLogin } from "@/service/LoginContext";
import { useEffect } from 'react';
import AdminLayout from './layouts/Admin';
import { Toaster } from 'react-hot-toast';

function App() {

  const loginContext = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loginContext.loading && !loginContext.user) {
      navigate('/login');
    }
  }, [loginContext.loading, loginContext.user, navigate]);

  return (
    <div className='App'>
      <Routes>
        <Route path="/*" element={<ClientLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  )
}

export default App
