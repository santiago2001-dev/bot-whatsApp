const { client } = require("../middelwares/conexion-wha");
const decodeToken = require("../middelwares/returnToken");
const Conductores = require("../models/conductores");
const Ubicacion = require("../models/ubicacion");
const { insertUbicacionClient } = require("./curdUbicacionController");

const NotificacionDeServicio = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { ruta, hora, lugarCarga, flete,number } = req.body;
    const decoded = await decodeToken(token);
    const conductor = await getNumeroConduc(decoded.idEmpresa);
    if (typeof conductor === "string") {
      return res.status(404).json({ message: conductor });
    }
    const message = `Hola ${conductor.Nombre_apellido}, se te ha asignado un Servicio.\n Ruta: ${ruta}.\nHora: ${hora}\nLugar de carga: ${lugarCarga}\n Flete :${flete}  \nPor favor, confirma tu ubicación.`;
    await enviarMensajeConductor(message, conductor.numero_contacto);

    let dataUbi = {
      numero: conductor.numero_contacto,
      ///numero :  number,
      id_empresa: conductor.id_empresa,
      conductor: conductor.id_cedula,
      tipo: 1,
    };
    await capturaUbicacionConductor(dataUbi);
    res.status(200).json({
      message:
        "Notificación envia espera de envio de ubicacion por parte del conductor",
    });
  } catch (error) {
    console.error("Error en NotificacionDeServicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const capturaUbicacionConductor = async (dataUbi) => {
  const messageListener = async (msg) => {
    let { numero } = dataUbi;

    if (msg.from === `57${numero}@c.us`) {
      if (msg.type === "location") {
        const location = msg.location;

        dataUbi.longitud = location.longitude;
        dataUbi.latitud = location.latitude;

        await insertUbicacionClient(dataUbi);

        client.off("message", messageListener);
      } else {
        enviarMensajeConductor("Envie una ubicación", numero);
      }
    }
  };

  client.on("message", messageListener);
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

// const capturaUbicacionConductor = (number) => {
//   return new Promise((resolve, reject) => {
//     client.on('message', async (msg) => {
//       if (msg.from === `57${number}@c.us`) {
//         if (msg.type === 'location') {
//           const location = msg.location;
//           const ubicacion = {
//             "latitude": location.latitude,
//             "longitude": location.longitude
//           };
//           console.log(ubicacion);
//           resolve(ubicacion);
//         } else {
//           await enviarMensajeConductor("Envie una ubicación", number);
//         }
//       }
//     });
//     // Optionally, you can add a timeout to reject the promise if location is not received within a certain time frame
//     setTimeout(() => {
//       reject(new Error("Timeout: No se recibió la ubicación del conductor"));
//     }, 60000); // Timeout after 60 seconds
//   });
// };

module.exports = {
  NotificacionDeServicio,
};
