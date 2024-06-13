const decodeToken = require("../middelwares/returnToken");
const Conductores = require("../models/conductores");
const Menu = require("./bot-wha");

const NotificacionDeServicio = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { ruta, hora, lugarCarga, flete, number } = req.body;
    const decoded = await decodeToken(token);
    const conductor = await getNumeroConduc(decoded.idEmpresa);

    if (typeof conductor === "string") {
      return res.status(404).json({ message: conductor });
    }
    await controller(conductor);

    res.status(200).json({
      message: " menu activado con conductor ",
    });
  } catch (error) {
    console.error("Error en NotificacionDeServicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const controller = async (conductor) => {
  if (
    !conductor ||
    !conductor.numero_contacto ||
    !conductor.id_cedula ||
    !conductor.id_empresa
  ) {
    console.error("Conductor no válido:", conductor);
    return;
  }

  const numeroConductor = conductor.numero_contacto;
  const id_cedula = conductor.id_cedula;
  const id_empresa = conductor.id_empresa;

  const menu = new Menu(numeroConductor, id_cedula, id_empresa);
  menu.start();
};

const getNumeroConduc = async (id) => {
  try {
    //todo: agregar busqueda de mejores conductores y sacar  numero
    const conductor = await Conductores.findOne({
      attributes: [
        "numero_contacto",
        "Nombre_apellido",
        "id_cedula",
        "id_empresa",
      ],
      where: {
        id_empresa: id,
      },
    });

    if (!conductor) {
      return "No se encontró número registrado de conductor";
    }
    return conductor;
  } catch (error) {
    console.error("Error al obtener el número de conductor:", error);
    throw error;
  }
};

module.exports = {
  NotificacionDeServicio,
};
