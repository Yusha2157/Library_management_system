import './App.css';
import {Route, Routes , Navigate} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="MainBody">
      <div className='MainContainer'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
