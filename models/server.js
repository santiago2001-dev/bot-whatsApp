const cors = require("cors");
const express = require("express");
const Menu = require("../controllers/bot-wha");
const sequelize = require("../db/conexion-squalize");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.autenticationRoute = "/api/login";
    this.whaRoute = "/api/whatssApp";
    this.ubicacionPath =  "/api/ubicacion"

    this.middelwares();
    //this.controller();
    this.routes();
    this.conexion();
  }

  middelwares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ limit: "50mb" }));
  }

  // controller() {
  //   const menu = new Menu();
  //   menu.opciones();
  // }

  conexion() {
    sequelize.authenticate()
      .then(() => {
        console.log("Conexión establecida con éxito.");
        
      })
      .catch((err) => {
        console.error("Error al conectar con la base de datos:", err);
      });
  }

  routes() {
    this.app.use(this.autenticationRoute, require("../routes/loginRoutes"));
    this.app.use(this.ubicacionPath, require("../routes/ubicacionRoutes"));

    this.app.use(this.whaRoute, require("../routes/botRoutes"));
    

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
