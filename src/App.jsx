import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import {useEffect, useState} from "react";
import { API_URL } from "./config";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasLogin, setHasLogin] = useState(true)

  const checkSession = async () => {
    const account = JSON.parse(localStorage.getItem('mediar'));
    if (!account?.token) {
      // Don't redirect if user is on password reset page
      if (location.pathname.includes('/auth/password-reset')) {
        return;
      }
      navigate("/auth/sign-in");
      return;
    }
    console.log('account', account)
    try {
      const response = await fetch(`${API_URL}/auth/check-session`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${account.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Session invalid');
      }

      const data = await response.json();
      // Update token with fresh one
      if (data.token) {
        localStorage.setItem('mediar', JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error('Session check failed:', error);
      localStorage.removeItem('mediar');
      // Don't redirect if user is on password reset page
      if (!location.pathname.includes('/auth/password-reset')) {
        navigate("/auth/sign-in");
      }
    }
  };

  const handleLocalStorage = () => {
    window.dispatchEvent(new Event("storage"));
  };

  window.addEventListener('storage', () => {
    const item = JSON.parse(localStorage.getItem('mediar'))
    if (!item?.token) {
      // Don't redirect if user is on password reset page
      if (!location.pathname.includes('/auth/password-reset')) {
        navigate("/auth/sign-in");
      }
    }
  });

  useEffect(() => {
    checkSession();
    handleLocalStorage();
  }, [])

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
