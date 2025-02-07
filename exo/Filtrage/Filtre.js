const films = [
    { id: 1, titre: "film 1", note: 4,   duree:45  },
    { id: 2, titre: "film 2", note: 4.5, duree:120 },
    { id: 3, titre: "film 3", note: 3.2, duree:90  },
    { id: 4, titre: "film 4", note: 3,   duree:60  }
  ];

function filtrage(films, critere) {
    return films.filter(film => {
    if (critere.note) {
        return film.note >= critere.note;
      }
    else if (critere.duree) {
        return film.duree >= critere.duree;
      }
      return true;
    });
  }
  
  console.log("Filtrer les films par une note >= 4 :",  filtrage(films, {note:4}));

  console.log("Filtrer les films par la duree >= 60 :", filtrage(films, {duree:60}));