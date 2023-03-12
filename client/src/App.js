import { Routes, Route, Navigate } from 'react-router-dom';
import NurseryFormControl from './Pages/AddNursery/NurseryFormControl';
import LandingPage from './Pages/LandingPage/LandingPage';
import Login from './Pages/LoginReg/Login';
import Register from './Pages/LoginReg/Register';
import HomePage from './Pages/HomePage/HomePage';
import SingleCategoryPage from './Pages/HomePage/SingleCategoryPage';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={user ? <Navigate to="/Home" /> : <Login />} />
        <Route path="/Register" element={user ? <Navigate to="/Home" /> : <Register />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/category/:categ" element={<SingleCategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;

