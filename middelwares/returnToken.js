const jwt = require("jsonwebtoken");

const decodeToken = async (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject("Token no proporcionado");
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        reject("Token inválido o vencido");
      } else {
        resolve(decoded);
      }
    });
    
  });
};

module.exports = decodeToken;
