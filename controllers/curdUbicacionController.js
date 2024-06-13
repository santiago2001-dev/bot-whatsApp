const Empresa = require("../models/Empresa");
const Conductores = require("../models/conductores");
const Ubicacion = require("../models/ubicacion");
const UbicacionesTipo = require("../models/ubicacionesTipo");

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
    console.log(error)
    return false 
  }
};

const getUbicById = async (req, res) => {
  try {
    let nit = req.body.nit;
    const ubicacion = await Ubicacion.findAll({
      attributes : ["id","longitud","latitud"],
      where: {
        conductor: nit
      },
      include: [
        {
          model: Conductores,
          attributes: ['id_cedula', 'Nombre_apellido'] // incluye los atributos que necesites
        },
        {
          model: Empresa,
          attributes: ['id', 'nombre'] // incluye los atributos que necesites
        },
        {
          model: UbicacionesTipo,
          attributes: ['id_ubicacion', 'nombre'] // incluye los atributos que necesites
        }
      ]
    });
    if (ubicacion && ubicacion.length > 0) {
      res.status(200).json({
        estadoRuta: ubicacion,
      });
    } else {
      res.status(400).json({
        message: "No se encontraron ubicaciones de este conductor",
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
