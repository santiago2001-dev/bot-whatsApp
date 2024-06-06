const Empresa = require("../models/Empresa");
const Usuario = require("../models/users");

const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: "Token inválido o vencido" });
    }

    next();
  });
};

module.exports = validarToken;

const existeMailTrue = async (req, res, next) => {
  try {
    const correo = req.body.email;

    const user = await Usuario.findAll({
      attributes: ["email"], // Debes pasar un array de atributos
      where: {
        email: correo,
      },
    });

    if (user.length > 0) {
      return res
        .status(400)
        .json({ error: `El correo electrónico ${correo} ya está registrado` });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: `Error interno del servidor ${error} al validar el correo `,
    });
  }
};

const validEmpresa = async (req, res, next) => {
  try {
    const id = req.body.idEmpresa;
    const result = await Empresa.findByPk(id, {
      where: {
        id: id,
      },
    });

    if (result.length < 0) {
      return res.status(400).json({ error: `La empresa ${id} no existe` });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: `Error interno del servidor ${error} al validar la empresa `,
    });
  }
};

const rejex = async (pass) => {
  let regxp = /^([a-zA-Z0-9*-]){6,}$/;

  return regxp.test(pass);
};

const ValidarPass = async (req, res, next) => {
  const contrasena = await req.body.contrasena;

  const rta = await rejex(contrasena);

  if (rta == false) {
    res.json({
      error:
        "contraseña debe tener Mínimo 6 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial ",
    });
  } else {
    next();
  }
};


module.exports = {
  existeMailTrue,
  ValidarPass,
  validEmpresa,
  validarToken
};
