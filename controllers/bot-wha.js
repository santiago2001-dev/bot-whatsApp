const { client } = require("../middelwares/conexion-wha");
const {
  insertUbicacionClient,
} = require("../controllers/curdUbicacionController");
const ls = require('local-storage');

const startMenu = (numeroConductor, id_cedula, id_empresa) => {
  let messageListener = null;
  let keywordListener = null;
  let menuTimeout = null;

  // const numeroConductor = ls.get("numeroConductor");
  // const id_cedula = ls.get("id_cedula");
  // const id_empresa = ls.get("id_empresa");
  ///console.log(numeroConductor)

  const start = () => {
    console.log("menu activado")
    listenForKeyword();
    startTimeout();
  };

  const listenForKeyword = () => {
    removeListeners();
    keywordListener = async (message) => {
      if (
        message.body.toLowerCase() === "hola" &&
        message.from === `57${numeroConductor}@c.us`
      ) {
        await client.sendMessage(
          message.from,
          "De vuelta en el menú principal\n" +
            "Hola soy botRastreo, ¿en qué te puedo colaborar? 😀👋\n Estas son las opciones:\n" +
            "1.🚚 Notifica llegada de cargue\n" +
            "2. ➕ Notifica llegada de descargue\n" +
            "3.🔚 Notifica llegada a destino\n" +
            "4.🔁 volver a el menu\n"
        );
        listenForOptions(message.from);
      }
    };
    client.on("message", keywordListener);
  };

  const listenForOptions = (from) => {
    removeListeners();
    messageListener = async (message) => {
      if (message.from === from) {
        clearTimeout(menuTimeout); // Reset timeout on interaction
        startTimeout(); // Restart timeout on interaction
        switch (message.body) {
          case "1":
            await handleLocationRequest({
              mensaje: "Envíe la ubicación actual por favor.",
              numeroConductor,
              id_empresa,
              id_cedula,
              tipo: 2,
            });
            break;

          case "2":
            await handleLocationRequest({
              mensaje: "Envíe la ubicación actual por favor.",
              numeroConductor,
              id_empresa,
              id_cedula,
              tipo: 3,
            });
            break;

          case "3":
            await handleLocationRequest({
              mensaje: "Envíe la ubicación actual por favor.",
              numeroConductor,
              id_empresa,
              id_cedula,
              tipo: 4,
            });
            break;

          default:
            await client.sendMessage(
              numeroConductor,
              "De vuelta en el menú principal\n" +
                "Hola soy botRastreo, ¿en qué te puedo colaborar? 😀👋\n Estas son las opciones:\n" +
                "1.🚚 Notifica llegada de cargue\n" +
                "2. ➕ Notifica llegada de descargue\n" +
                "3.🔚 Notifica llegada a destino\n" +
                "4.🔁 volver a el menu\n"
            );
            break;
        }
      }
    };
    client.on("message", messageListener);
  };

  const handleLocationRequest = async ({
    mensaje,
    numeroConductor,
    id_empresa,
    id_cedula,
    tipo,
  }) => {
    const infoMessage = {
      mensaje,
      number: numeroConductor,
    };

    await enviarMensajeConductor(infoMessage);

    const dataUbi = {
      numero: numeroConductor,
      id_empresa,
      conductor: id_cedula,
      tipo,
    };

    console.log(dataUbi);

   

    const conductor = {
     "numero_contacto": numeroConductor, 
     "id_cedula": id_cedula, 
     "id_empresa":id_empresa
    }
    await capturaUbicacionConductor(dataUbi,conductor);
  };

  const startTimeout = () => {
    menuTimeout = setTimeout(() => {
      console.log(
        `Eliminando listeners para ${numeroConductor} por inactividad.`
      );
      removeListeners();
    }, 300000); // 5 minutos en milisegundos
  };

  const removeListeners = () => {
    if (keywordListener) {
      client.off("message", keywordListener);
      keywordListener = null;
    }
    if (messageListener) {
      client.off("message", messageListener);
      messageListener = null;
    }
    if (menuTimeout) {
      clearTimeout(menuTimeout);
      menuTimeout = null;
    }
  };

  return { start };
};



const capturaUbicacionConductor = async (dataUbi,conductor) => {
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
        const infoMessage = {
          mensaje: "Envie una ubicación",
          number: numero,
        };
        await enviarMensajeConductor(infoMessage);
      }
    }
  };

  client.on("message", messageListener);
};

const controller = async (conductor) => {
  if (!conductor || !conductor.numero_contacto || !conductor.id_cedula || !conductor.id_empresa) {
    console.error("Conductor no válido:", conductor);
    return;
  }

  const numeroConductor = conductor.numero_contacto;
  const id_cedula = conductor.id_cedula;
  const id_empresa = conductor.id_empresa;

  ls.set("numeroConductor", numeroConductor);
  ls.set("id_cedula", id_cedula);
  ls.set("id_empresa", id_empresa);

  const menu = startMenu(numeroConductor, id_cedula, id_empresa);
  menu.start();
};



const enviarMensajeConductor = async (infoMessage) => {
  try {
    const { number, mensaje } = infoMessage;
    const chatId = `57${number}@c.us`;

    console.log(`Enviando mensaje a ${chatId}: ${mensaje}`);
    const response = await client.sendMessage(chatId, mensaje);
    if (response.id.fromMe) {
      return "Mensaje enviado con éxito";
    }
  } catch (error) {
    console.error("Error al enviar el mensaje al conductor:", error);
    throw error;
  }
};

module.exports = {
  startMenu,
  capturaUbicacionConductor,
  enviarMensajeConductor,
  controller
};
