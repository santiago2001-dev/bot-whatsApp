const { Client } = require('whatsapp-web.js');
const {client} = require('../middelwares/conexion-wha');
const Producto = require('./curd-producto')
class Menu {

    constructor(){
        this.nameProduct
        this.priceProduct
        this.stockProduct
        this.produ


    }
      opciones = ()=>{


        this.menuPrincipal();

        client.on('message',message=>{
                  if(message.body == '1'){
                    const producto = new Producto();

                    producto.getAllProduct().then((products) => {
                      client.sendMessage(message.from,products);
              
                      });
                      this.menuPrincipal();

                   }
                     if(message.body =='2'){
                      client.sendMessage(message.from,'porfavor ingresa el nombre , precio y cantidad del producto seperado por coma');
                      this.crate()
                    
                     

                    }
                    if(message.body =='3'){

                    }
                  if(message.body =='4'){
                    client.sendMessage(message.from,'porfavor ingresa el nombre del producto a eliminar')

                    this.delete()
                  }
              })
           
}

        menuPrincipal(){
        client.on('message',message=>{
          if(message.body =='hola'  && !message.body.includes  ('1') && !message.body.includes  ('2')&& !message.body.includes  ('3')&& !message.body.includes('4')){

                client.sendMessage(message.from,
                  'Hola soy bootStore Poli , ¿en que te puedo colaborar? 😀👋\n Estas son las opciones \n'+
                  '1.🔍 Ver lista de productos \n'+
                  '2. ➕ Agregar Productos \n'+
                  '3.🔁 Actualizar Producto \n'
                  +'4.✖ Borrar Producto \n'
              );
                  }
                  })
                }

           
           

    crate(){
      const producto = new Producto();

      client.on('message',message => {
      let array = message.body.split(",");
        this.nameProduct = array[0];
        this.priceProduct = array[1];
        this.stockProduct = array[2];
        producto.addProduct(this.nameProduct,this.priceProduct,this.stockProduct).then(( rta)=>{
            client.sendMessage(message.from,rta)
        }).catch(function(err){
          console.log(err.message)
       }).finally(() => {
          return
      });

    })
    }

    delete(){
      const producto = new Producto();
      client.on('message',message => {
                  console.log(message.body)
                  producto.deleteProduct(message.body).then(( rta)=>{
                    client.sendMessage(message.from,rta);
                  
                   }).catch(function(err){
                      console.log(err.message)
                   }).finally(() => {
                      return
                  });
                   })


      }


   


   
}

module.exports = Menu

//  //leer mensajes
//   client.on('message', async (message) => {
//   console.log(message.body)
//   })


//   //responder mensaje
//   client.on('message', message => {
//   	if(message.body === '!ping') {
//   		message.reply('pong');
//   	}
//   });


//   //enviar mensaje a numero especifico
//  client.on('message', message => {
//      let chatID = codigo_pais + number + "@c.us";

//  	msj ="hola"

//  		client.sendMessage(chatID,msj);
	
//  });

//   //enviar mensaje a cualquier numero segun el cuerpo de el mensaje
//  client.on('message', message => {
//  	if(message.body === '!ping') {
//  		client.sendMessage(message.from, 'pong');
//  	}
//  });