const { encript } = require("../middelwares/encript");
const Usuario = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const CreateUserClient = async (req, res) => {
  try {
    let { nombreUsuario, email, idEmpresa, contrasena } = req.body;
    const hash = await encript(contrasena);
    await Usuario.create({
      nombre_usuario: nombreUsuario,
      email: email,
      password: hash,
      id_empresa: idEmpresa,
    });

    res.status(200).json({
      message: "Usuario creado de forma correcta",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    const user = await Usuario.findOne({
      attributes: ["password","id_empresa"],
      where: {
        nombre_usuario: usuario,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const contrasenaUsuario = user.password;
    const contrasenaCorrecta = bcrypt.compareSync(
      contrasena,
      contrasenaUsuario
    );

    if (!contrasenaCorrecta) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ usuario: usuario,idEmpresa: user.id_empresa }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      token: token
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  CreateUserClient,
  login,
};
