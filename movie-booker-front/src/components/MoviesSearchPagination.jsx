const MoviesSearchPagination = ({ search, setSearch, sort, setSort, limit, setLimit, page, setPage, totalPages }) => {
  
    const handleNextPage = () => {
      if (page < totalPages) {
        setPage(page + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (page > 1) {
        setPage(page - 1);
      }
    };
  
    return (
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popularity.desc">Popularité ↓</option>
          <option value="popularity.asc">Popularité ↑</option>
          <option value="release_date.desc">Date de sortie ↓</option>
          <option value="release_date.asc">Date de sortie ↑</option>
          <option value="vote_average.desc">Note des utilisateurs ↓</option>
          <option value="vote_average.asc">Note des utilisateurs ↑</option>
        </select>
  
        <select value={limit} onChange={(e) => setLimit(e.target.value === "all" ? "all" : Number(e.target.value))}>
          <option value={5}>5 films</option>
          <option value={10}>10 films</option>
          <option value={15}>15 films</option>
          <option value={20}>20 films</option>
          <option value="all">Tout</option>
        </select>
  
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>Précédent</button>
          <span>Page {page} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages}>Suivant</button>
        </div>
      </div>
    );
  };
  
  export default MoviesSearchPagination;
  