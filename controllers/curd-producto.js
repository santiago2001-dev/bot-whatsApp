const db = require('../db/config');

class producto{
    constructor(){
        this.prod = ''
        this.resultado = ''
    }


wwwgetAllProduct  () {
    const query = 'select * from productos';
    return new Promise((resolve, reject) => {
      db.query(query, (error, results, fields) => {
        if (error) {
          reject(error);
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
               
            this.prod = ` total de productos : ${results.length}\n 🔍 nombre : ${results[i].name}\n 💸 precio : ${results[i].price}\n 🛒 cantidad: ${results[i].stock}\n\n`
            this.resultado =this.resultado +  this.prod

            //  this.prod = ` total de productos : ${results.length}\n ${results[i]}}`

          }
          resolve(this.resultado);
        }
      });
    });
  };
  


  deleteProduct(name){
    return new Promise((resolve, reject) => {
      const query = `delete from productos where name = '${name}'`;
      db.query(query, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          let rta = 'producto elimnado de forma correcta'
          resolve(rta)  ;
        }
      });
    });
  }

  addProduct(name, price, stock){
    return new Promise((resolve, reject) => {
      const query = `insert into productos (name, price, stock) values ('${name}','${price}','${stock}')`;
      db.query(query, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          let rta = 'producto agregado de forma correcta'
          resolve(rta);
        }
      });
    });
  }

  updateProduct(name, price, stock){
    return new Promise((resolve, reject) => {
      const query = `update productos set  price = '${price}', stock = '${stock}' where name = '${name}'`;
      db.query(query, (error, results, fields) => {
        if(error){
          reject(error)
        }else{
          let rta = 'producto actualizado de forma correcta'
          resolve(rta)
        }
      })
    })
  }

}
module.exports = producto

