import './App.css';
import {Route, Routes , Navigate} from 'react-router-dom';
import Home from './pages/HomePage'
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div className="MainBody">
      <div className='MainContainer'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
