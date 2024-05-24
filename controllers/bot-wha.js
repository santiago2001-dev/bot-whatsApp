const { client } = require("../middelwares/conexion-wha");
const Producto = require("./curd-producto");

class Menu {
  async opciones() {
    this.menuPrincipal();

    client.on("message", async (message) => {
      switch (message.body) {
        case "1":
          const producto = new Producto();
          let result = await producto.getAllProduct();
          await client.sendMessage(message.from, result);
          this.menuPrincipal();
          break;

        case "2":
          await client.sendMessage(
            message.from,
            "Por favor ingresa el nombre, precio y cantidad del producto separado por coma"
          );
          this.create();
          break;

        case "3":
          await client.sendMessage(
            message.from,
            "Ingresa el nombre del producto, el precio y la cantidad a actualizar, separados por coma"
          );
          this.update();
          break;

        case "4":
          await client.sendMessage(
            message.from,
            "Ingresa el nombre del producto para eliminar"
          );
          this.delete();
          break;

        default:
          await client.sendMessage(
            message.from,
            "de vuelta en el menu principal"
          );
          this.menuPrincipal();
          break;
      }
    });
  }

  menuPrincipal() {
    client.on("message", (message) => {
      if (
        message.body.toLowerCase === "hola" &&
        !message.body.includes("1") &&
        !message.body.includes("2") &&
        !message.body.includes("3") &&
        !message.body.includes("4")
      ) {
        client.sendMessage(
          message.from,
          "Hola soy bootStore Poli , ¿en que te puedo colaborar? 😀👋\n Estas son las opciones \n" +
            "1.🔍 Ver lista de productos \n" +
            "2. ➕ Agregar Productos \n" +
            "3.🔁 Actualizar Producto \n" +
            "4.✖ Borrar Producto \n"
        );
      }
    });
  }

  getAll() {
    const producto = new Producto();
    client.on("message", async (message) => {
      try {
        console.log(message.body);
        const name = message.body.trim();
        if (name == "1" || name == "2" || name == "3" || name == "4") {
          this.menuPrincipal();
        } else {
          const result = await producto.getAllProduct();
          client.sendMessage(message.from, result);
        }
      } catch (error) {
        console.error(error);
        client.sendMessage(message.from, "No se pudo obtener los productos");
      } finally {
        client.removeAllListeners("message"); // Termina el ciclo del mensaje
        this.menuPrincipal();
      }
    });
  }

  create() {
    const producto = new Producto();

    client.on("message", async (message) => {
      let array = message.body.split(",");
      let nameProduct = array[0];
      let priceProduct = array[1];
      let stockProduct = array[2];

      try {
        const product = message.body.trim();
        if (
          product == "1" ||
          product == "2" ||
          product == "3" ||
          product == "4"
        ) {
          this.menuPrincipal();
        } else {
          let resultado = await producto.addProduct(
            nameProduct,
            priceProduct,
            stockProduct
          );
          client.sendMessage(message.from, resultado);
        }
      } catch (error) {
        console.log(error);
        client.sendMessage(message.from, "No se pudo agregar el producto");
      } finally {
        client.removeAllListeners("message"); // Termina el ciclo del mensaje
        this.menuPrincipal();
      }
    });
  }

  delete() {
    const producto = new Producto();
    client.on("message", async (message) => {
      try {
        console.log(message.body);
        const name = message.body.trim();
        if (name == "1" || name == "2" || name == "3" || name == "4") {
          this.menuPrincipal();
        } else {
          const result = await producto.deleteProduct(name);
          client.sendMessage(message.from, result);
        }
      } catch (error) {
        console.error(error);
        client.sendMessage(message.from, "No se pudo eliminar el producto");
      } finally {
        client.removeAllListeners("message"); // Termina el ciclo del mensaje
        this.menuPrincipal();
      }
    });
  }

  update() {
    const producto = new Producto();
    client.on("message", async (message) => {
      let array = message.body.split(",");
      let nameProduct = array[0];
      let priceProduct = array[1];
      let stockProduct = array[2];
      const name = message.body.trim();
      try {
        if (name == "1" || name == "2" || name == "3" || name == "4") {
          this.menuPrincipal();
        } else {
          let resultado = await producto.updateProduct(
            nameProduct,
            priceProduct,
            stockProduct
          );
          client.sendMessage(message.from, resultado);
        }
      } catch (error) {
        console.log(error);
        client.sendMessage(message.from, "No se pudo actualizar el producto");
      } finally {
        client.removeAllListeners("message"); // Termina el ciclo del mensaje
        this.menuPrincipal();
      }
    });
  }
}

module.exports = Menu;

