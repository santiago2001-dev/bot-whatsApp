const mysq = require('mysql')

const conexion = mysq.createConnection({
    database : process.env.DB,
    host : process.env.HOST_DB,
    user : process.env.USER_DB,
    password : process.env.PASS_DB,
    port : process.env.PORT_DB,
      
})

 conexion.connect(function(err) {
    if (err) throw err;
    console.log("Conexion exitosa");
});

module.exports = conexion;