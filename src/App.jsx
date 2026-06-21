import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DayPage from './pages/DayPage';
import CompletionPage from './pages/CompletionPage';
import './App.css';

function App() {
  const { loading } = useUser();

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/day/:day" element={<DayPage />} />
          <Route path="/completed" element={<CompletionPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;