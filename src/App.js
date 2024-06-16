import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import NewRegistration from './Pages/NewRegistration';
import NotFound from './Pages/NotFound';
import { AuthProvider } from './Authentication/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentDetails from './Pages/StudentDetails';

function App() {

  return (
    <>
      <div className="App">
        <ToastContainer />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/new" element={<ProtectedRoute><NewRegistration /></ProtectedRoute>} />
              <Route path="/student/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
              <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
            </Routes>
          </Router>
        </AuthProvider>

      </div>
    </>

  );
}

export default App;
