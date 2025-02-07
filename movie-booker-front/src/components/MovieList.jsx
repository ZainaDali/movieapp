import { useEffect, useState } from 'react';
import { fetchMovies, createReservation } from '../services/api';
import { getUser, getToken } from '../services/auth';
import MoviesSearchPagination from './MoviesSearchPagination';
import "../styles.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); 

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies(page, search, sort);
        setMovies(limit === "all" ? data.results : data.results.slice(0, limit));
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Erreur récupération films:", error);
      }
    };
    getMovies();
  }, [page, search, sort, limit]);

  const handleReserve = async (movie) => {
    if (!date) {
      alert('Veuillez entrer une date de début');
      return;
    }
    try {
      const token = getToken();
      if (!token) {
        alert('Vous devez être connecté pour réserver');
        return;
      }
      const movieId = Number(movie.id);
      await createReservation(movieId, date, token);
      alert('Réservation réussie !');
      setSelectedMovie(null);
    } catch (error) {
      alert("Erreur lors de la réservation : vérifiez que l'heure de réservation ne chevauche pas une autre réservation précédente");
    }
  };

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <h2>Films en salle</h2>
      <MoviesSearchPagination
        search={search} setSearch={setSearch}
        sort={sort} setSort={setSort}
        limit={limit} setLimit={setLimit}
        page={page} setPage={setPage}
        totalPages={totalPages}
      />

      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <h3>id: {movie.id}</h3>
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            <p>{movie.overview}</p>
            
            {getUser() ? (
              <>
                <input 
                  type="datetime-local" 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                />
                <button onClick={() => handleReserve(movie)}>Réserver</button>
              </>
            ) : (
              <p><a href="/login">Connectez-vous</a> pour réserver</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
