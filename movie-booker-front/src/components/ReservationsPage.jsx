import { useEffect, useState } from "react";
import { getProfile, cancelReservation } from "../services/api";
import { getToken } from "../services/auth";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!token) return;
      try {
        const profile = await getProfile(token);
        setReservations(profile.user.reservations || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token]);

  const handleCancelReservation = async (id) => {
    if (!window.confirm("Voulez-vous vraiment annuler cette réservation ?")) return;

    try {
      await cancelReservation(id, token);
      setReservations(reservations.filter(reservation => reservation.id !== id));
      alert("Réservation annulée avec succès !");
    } catch (error) {
      alert("Erreur lors de l'annulation de la réservation");
    }
  };

  return (
    <div className="reservations-container">
      <h2>Mes Réservations</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <ul className="reservations-list">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="reservation-card">
              <p><strong>Film ID :</strong> {reservation.id_movie}</p>
              <p><strong>Début :</strong> {new Date(reservation.debut).toLocaleString()}</p>
              <p><strong>Fin :</strong> {new Date(reservation.fin).toLocaleString()}</p>
              <button className="cancel-btn" onClick={() => handleCancelReservation(reservation.id)}>Annuler</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationsPage;
