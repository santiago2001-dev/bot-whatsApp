const { client } = require("../middelwares/conexion-wha");
const { insertUbicacionClient } = require("./curdUbicacionController");

class Menu {
  constructor(numeroConductor, id_cedula, id_empresa) {
    this.numeroConductor = numeroConductor;
    this.messageListener = null;
    this.keywordListener = null;
    this.id_cedula = id_cedula;
    this.id_empresa = id_empresa;
  }

  async start() {
    this.listenForKeyword();
  }

  listenForKeyword() {
    console.log("menu activado");
    this.removeListeners();
    this.keywordListener = async (message) => {
      if (
        message.body.toLowerCase() === "hola" &&
        message.from === `57${this.numeroConductor}@c.us`
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
        this.listenForOptions(message.from);
      }
    };
    client.on("message", this.keywordListener);
  }

  listenForOptions(from) {
    this.removeListeners();
    this.messageListener = async (message) => {
      if (message.from === from) {
        switch (message.body) {
          case "1":
            const message = {
              number: this.numeroConductor,
              mensaje: "Envíe la ubicación actual por favor.",
            };
            this.enviarMensajeConductor(message);

            let dataUbi = {
              number: this.numeroConductor,
              conductor: this.id_cedula,
              id_empresa: this.id_empresa,
              tipo: 2,
            };

            this.listenForLocation(from, dataUbi);

            break;

          case "2":
            const messageDes = {
              number: this.numeroConductor,
              mensaje: "Envíe la ubicación actual por favor.",
            };
            this.enviarMensajeConductor(messageDes);

            let dataUbiDes = {
              number: this.numeroConductor,
              conductor: this.id_cedula,
              id_empresa: this.id_empresa,
              tipo: 3,
            };

            this.listenForLocation(from, dataUbiDes);

            break;
          case "3":
            const messageFin = {
              number: this.numeroConductor,
              mensaje: "Envíe la ubicación actual por favor.",
            };
            this.enviarMensajeConductor(messageFin);

            let dataUbiFin = {
              number: this.numeroConductor,
              conductor: this.id_cedula,
              id_empresa: this.id_empresa,
              tipo: 4,
            };

            this.listenForLocation(from, dataUbiFin);

            break;

          default:
            let infoMessage = {
              number: this.numeroConductor,
              mensaje:
                "De vuelta en el menú principal\n" +
                "Hola soy botRastreo, ¿en qué te puedo colaborar? 😀👋\n Estas son las opciones:\n" +
                "1.🚚 Notifica llegada de cargue\n" +
                "2. ➕ Notifica llegada de descargue\n" +
                "3.🔚 Notifica llegada a destino\n" +
                "4.🔁 volver a el menu\n",
            };
            this.enviarMensajeConductor(infoMessage);
            break;
        }
      }
    };
    client.on("message", this.messageListener);
  }

  removeListeners() {
    if (this.keywordListener) {
      client.off("message", this.keywordListener);
      this.keywordListener = null;
    }
    if (this.messageListener) {
      client.off("message", this.messageListener);
      this.messageListener = null;
    }
  }

  listenForLocation(from, dataUbi) {
    const locationListener = async (message) => {
      if (message.from === from && message.type === "location") {
        const location = message.location;
        dataUbi.longitud = location.longitude;
        dataUbi.latitud = location.latitude;
        const insertUbi = await insertUbicacionClient(dataUbi);
        if (insertUbi) {
          const response = {
            number: dataUbi.number,
            mensaje: "ubicacion capturada de forma correcta",
          };
          this.enviarMensajeConductor(response);
        } else {
          const response = {
            number: dataUbi.number,
            mensaje: "no se pudo capturar la ubicacion intente de nuevo ",
          };
          this.enviarMensajeConductor(response);
        }

        client.off("message", locationListener);
      } else {
        const response = {
          number: dataUbi.number,
          mensaje: "envie su ubicacion.  ",
        };
        this.enviarMensajeConductor(response);
      }
    };
    client.on("message", locationListener);
  }

 
  enviarMensajeConductor = async (infoMessage) => {
    try {
      const { number, mensaje } = infoMessage;
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
}

module.exports = Menu;
