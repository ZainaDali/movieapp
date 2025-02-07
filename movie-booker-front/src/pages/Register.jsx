import { useState } from 'react';
import { registerUser } from '../services/api';
import '../styles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      alert('Inscription réussie, connectez-vous !');
      window.location.href = '/login';
    } catch {
      alert('Erreur lors de l’inscription');
    }
  };

  return (
    <div className="auth-container">
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">S'inscrire</button>
    </form>
    </div>
  );
};

export default Register;
