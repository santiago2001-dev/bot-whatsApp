const router = require("express").Router();
const { getUbicById } = require("../controllers/curdUbicacionController");
const { validarCamapos } = require("../validators/validatorExpress");
const { check } = require("express-validator");
router.get('/',
check("nit","el campo nit es obligatorio").notEmpty(),
validarCamapos,
getUbicById)
module.exports  =router;