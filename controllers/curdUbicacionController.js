const Ubicacion = require("../models/ubicacion");

const insertUbicacionClient = async (ubicacion) => {
  try {
    console.log(ubicacion)
    let { longitud, latitud, conductor, tipo, id_empresa } = ubicacion;
    await Ubicacion.create({
      longitud: longitud,
      latitud: latitud,
      conductor: conductor,
      tipo: tipo,
      id_empresa: id_empresa,
    });
    return true;
  } catch (error) {
    console.log(error.message)
}
};

const getUbicById = async (req, res) => {
  try {
    let nit = req.body.nit;
    const ubicacion = await Ubicacion.findAll({
      where: {
        conductor: nit
      },
    });
    if (ubicacion) {
      res.status(200).json({
        ubicacion: ubicacion,
      });
    } else {
      res.status(400).json({
        message: "no se encontraron ubicaciones de este conductor ",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  insertUbicacionClient,
  getUbicById,
};
