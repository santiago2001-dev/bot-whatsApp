const { NotificacionDeServicio } = require("../controllers/botWhaController");
const {validarToken} = require("../validators/loginValidation");

const router = require("express").Router();

router.get("/send",
    validarToken,
    NotificacionDeServicio
)

module.exports = router;
