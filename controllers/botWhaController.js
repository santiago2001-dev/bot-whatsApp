const { client } = require("../middelwares/conexion-wha");
const decodeToken = require("../middelwares/returnToken");
const Conductores = require("../models/conductores");

const NotificacionDeServicio = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = await decodeToken(token);
    const conductor = await getNumeroConduc(decoded.idEmpresa);
    if (typeof conductor === "string") {
      return res.status(404).json({ message: conductor });
    }
    const message = `Hola ${conductor.Nombre_apellido}, se te ha asignado un Servicio.\nLugar: Carrera ejemplo #1 sur.\nHora: 20:00.\nLugar de carga: Calle falsa 1234.\nPor favor, confirma tu ubicación.`;
    const response = await enviarMensajeConductor(
      message,
      conductor.numero_contacto
    );
    res
      .status(200)
      .json({
        message: "Notificación enviada correctamente al conductor",
        response,
      });
  } catch (error) {
    console.error("Error en NotificacionDeServicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const enviarMensajeConductor = async (mensaje, number) => {
  try {
    const chatId = `57${number}@c.us`;
    const response = await client.sendMessage(chatId, mensaje);
    if (response.id.fromMe) {
      return "Mensaje enviado con éxito";
    }
  } catch (error) {
    console.error("Error al enviar el mensaje al conductor:", error);
    throw error;
  }
};

const getNumeroConduc = async (id) => {
  try {
    const conductor = await Conductores.findOne({
      attributes: ["numero_contacto", "Nombre_apellido"],
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
