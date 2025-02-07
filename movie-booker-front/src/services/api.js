import axios from 'axios';

const API_URL = 'https://movie-booker-back.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMovies = async (page = 1, search = '', sort = 'popularity.desc') => {
    console.log("📡 Envoi au backend → Page:", page, "Search:", search, "Sort:", sort);
    
    try {
      const response = await api.get('/movies', {
        params: { page:page, 
          search: search, 
          sort_by: sort}, 
      });
      
      console.log("✅ Films reçus:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erreur de récupération des films:", error.response?.data || error.message);
      throw error;
    }
  };
  
  
  

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const fetchMovieById = async (movieId) => {
    const response = await api.get(`/movies/${movieId}`);
    return response.data;
  };
  

  export const createReservation = async (id_movie, debut, token) => {
  
    try {
      const response = await api.post(
        '/reservations',
        { id_movie: Number(id_movie), debut }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getProfile = async (token) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  
    if (!response.ok) throw new Error("Erreur lors de la récupération du profil");
    return response.json();
  };
  
  export const cancelReservation = async (id, token) => {
    const response = await fetch(`${API_URL}/reservations/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  
    if (!response.ok) throw new Error("Erreur lors de l'annulation de la réservation");
    return response.json();
  };
  