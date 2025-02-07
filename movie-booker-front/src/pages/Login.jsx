import { useState } from 'react';
import { loginUser } from '../services/api';
import { saveToken } from '../services/auth';
import '../styles.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      saveToken(response.token);
      window.location.href = '/';
    } catch {
      alert('Connexion échouée');
    }
  };

  return (
    <div className="auth-container">
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
    </div>
  );
};

export default Login;
