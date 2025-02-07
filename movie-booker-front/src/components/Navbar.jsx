import { Link } from 'react-router-dom';
import { getUser, logout } from '../services/auth';
import '../styles.css';
const Navbar = () => {
  const user = getUser();

  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link>
      {user ? (
        <>
          <span>Bienvenue, {user.email}!</span>
          <Link to="/reservations">Mes Réservations</Link> 
          <button onClick={() => { logout(); window.location.href = '/'; }}>Déconnexion</button>
        </>
      ) : (
        <>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
