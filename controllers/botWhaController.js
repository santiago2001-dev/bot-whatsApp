const decodeToken = require("../middelwares/returnToken");
const Conductores = require("../models/conductores");
const {
  
  enviarMensajeConductor,
  capturaUbicacionConductor,
  controller
} = require("./bot-wha");


const NotificacionDeServicio = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { ruta, hora, lugarCarga, flete, number } = req.body;
    const decoded = await decodeToken(token);
    const conductor = await getNumeroConduc(decoded.idEmpresa);

    if (typeof conductor === "string") {
      return res.status(404).json({ message: conductor });
    }

    const message = `Hola ${conductor.Nombre_apellido}, se te ha asignado un Servicio.\n Ruta: ${ruta}.\nHora: ${hora}\nLugar de carga: ${lugarCarga}\n Flete :${flete}  \nPor favor, confirma tu ubicación.`;

    const infoMessage = {
      mensaje: message,
      number: conductor.numero_contacto,
    };

    await enviarMensajeConductor(infoMessage);

    let dataUbi = {
      numero: conductor.numero_contacto,
      id_empresa: conductor.id_empresa,
      conductor: conductor.id_cedula,
      tipo: 1,
    };

    //await capturaUbicacionConductor(dataUbi, conductor);
    await controller(conductor);

    res.status(200).json({
      message: "Notificación enviada espera de envio de ubicacion por parte del conductor",
    });
  } catch (error) {
    console.error("Error en NotificacionDeServicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
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
