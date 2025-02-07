// EXO Authentification

function generateToken(User) {
    return btoa(JSON.stringify(User));
  }
function verifyToken(Token) {
    return JSON.parse(atob(Token));
  }

// Test des fonctions

const utilisateur = { mail: "zaina@efrei.net", mdp: "efrei2025" };
console.log("informations utilisateur :", utilisateur);

const token = generateToken(utilisateur);
console.log("informations codés :", token);

const decoder_token = verifyToken(token);
console.log("informations décodés :", decoder_token);