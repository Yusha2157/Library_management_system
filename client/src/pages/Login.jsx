import {useState} from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('/auth/login' , {email , password});
      login(res.data.user , res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 border" required/>
      <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-2 p-2 border" required/>
      <button type='submit' className="w-full p-2 bg-blue-600 text-white">login</button>
    </form>
  )
}