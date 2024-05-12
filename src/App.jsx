import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import {useEffect, useState} from "react";

function App() {
  const navigate = useNavigate();
  const [hasLogin, setHasLogin] = useState(true)

  const handleLocalStorage = () => {
    window.dispatchEvent(new Event("storage"));
  };

  window.addEventListener('storage', () => {
    const item = localStorage.getItem('mediar')
    if (!item) {
      navigate("/auth/sign-in");
    }
  })

  useEffect(() => {
    handleLocalStorage()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </>

  );
}

export default App;
