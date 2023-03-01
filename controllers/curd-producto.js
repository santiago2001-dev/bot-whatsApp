const db = require('../db/config');
const {client} = require('../middelwares/conexion-wha');

class producto{
    constructor(){
        this.prod = ''
    }
//  getAllProduct = ()=>{
//     const query = 'select * from productos';
//     db.query(query,(err,results,fields)=>{
//         if(err){
//          throw  err
//         }else{
        
//              let products = []; // Objeto JSON que vamos a construir

//             for (let i = 0; i < results.length; i++) {
//               let product = {
//                 id: results[i].id,
//                 name: results[i].name,
//                 price: results[i].price,
//                 stock : results[i].stock
//               };
        
//               products.push(product); 
              
//                this.prod = `nombre : ${products[0].name}\n precio : ${products[0].price}\n cantidad${products[0].stock}`
//               return this.products
//               //this.sendMessage(this.prod);
            
             
             
//             }
        
//         }
//     })
// }

getAllProduct = () => {
    const query = 'select * from productos';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          let products = [];
          for (let i = 0; i < results.length; i++) {
              
              
            //   let product = {
            //       id: results[i].id,
            //       name: results[i].name,
            //       price: results[i].price,
            //       stock: results[i].stock
            //     };
            //     products.push(product);
                this.prod = ` total de productos : ${results.length}\n nombre : ${results[i].name}\n precio : ${results[i].price}\n cantidad: ${results[i].stock}`
      //  this.prod = ` total de productos : ${results.length}\n ${results[i]}}`

          }
          resolve(this.prod);
        }
      });
    });
  };
  


sendMessage(info){
    client.on('message',message => {
            console.log('hola',info)
        client.sendMessage(message.from,info)

        });

}

}
module.exports = producto

