const { client } = require("../middelwares/conexion-wha");
const { CreateUserClient, login } = require("../controllers/autController");
const {
  ValidarPass,
  existeMailTrue,
  validEmpresa,
} = require("../validators/loginValidation");
const { check } = require("express-validator");
const { validarCamapos } = require("../validators/validatorExpress");

const router = require("express").Router();

router.post(
  "/register",
  check("email", "Debe proporcionar un email válido").notEmpty().isEmail(),
  check("contrasena", "La contraseña es obligatoria").notEmpty(),
  check("idEmpresa", "El id de empresa es obligatorio").notEmpty(),
  check("nombreUsuario", "El nombre de Usuario es obligatorio").notEmpty(),
  validarCamapos,
  ValidarPass,
  existeMailTrue,
  validEmpresa,
  CreateUserClient
);

router.post(
  "/",
  check("usuario", "El nombre de usuario es obligatorio").notEmpty(),
  check("contrasena", "La contraseña es obligatoria").notEmpty(),
  validarCamapos,
  login
);

module.exports = router;
