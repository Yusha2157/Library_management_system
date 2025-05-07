import {useState} from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form , setForm] = useState({name : '' , email : '' , password : ''});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/new' , form);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <input type="text" placeholder='Name' value={form.name} onChange={e => setForm({ ...form , name : e.target.value})} className="w-full mb-2 p-2 border" required/>
      <input type="email" placeholder='Email' value={form.email} onChange={e => setForm({...form , email : e.target.value})} className="w-full mb-2 p-2 border" required/>
      <input type="password" placeholder='Password' value={form.password} onChange={e => setForm({...form , password : e.target.value})} className="w-full mb-2 p-2 border" required/>
      <button type='submit' className="w-full p-2 bg-blue-600 text-white">Register</button>
    </form>
  )
}