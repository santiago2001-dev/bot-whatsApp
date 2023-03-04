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
      async opciones (){


        this.menuPrincipal();

        client.on('message',async message=>{
                  if(message.body == '1'){
                    const producto = new Producto();

                    let result = await producto.getAllProduct()
                     await client.sendMessage(message.from,result);
              
                    
                      this.menuPrincipal();

                   }
                     if(message.body =='2'){
                      await  client.sendMessage(message.from,'porfavor ingresa el nombre , precio y cantidad del producto seperado por coma');
                      this.crate()
                    
                     

                    }
                    if(message.body =='3'){

                    }
                  if(message.body =='4'){
                    await client.sendMessage(message.from,'porfavor ingresa el nombre del producto a eliminar')

                    this.delete()
                  }
              })
           
}

        menuPrincipal(){
          client.on('message', message=>{
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

      client.on('message',async message => {
      let array = message.body.split(",");
        this.nameProduct = array[0];
        this.priceProduct = array[1];
        this.stockProduct = array[2];

        try{
           const product = message.body.trim();
           if (product == '1' ||product == '2' ||product == '3' ||product == '4' ) {
            this.menuPrincipal();
           }else{
            let resultado = await producto.addProduct(this.nameProduct,this.priceProduct,this.stockProduct)
            client.sendMessage(message.from,resultado)
           }
        

          }catch(error){
            console.log(error)
            client.sendMessage(message.from,'No se pudo agregar el producto')
          }
      
    })
    }


    delete() {
        const producto = new Producto();
        client.on('message', async message => {
          try {
            console.log(message.body);
            const name = message.body.trim();
            if (name == '1' ||name == '2' ||name == '3' ||name == '4' ) {
              this.menuPrincipal()
             } else {
              const result = await producto.deleteProduct(name);
              client.sendMessage(message.from, result);
            }
          } catch (error) {
            console.error(error);
            client.sendMessage(message.from, 'No se pudo eliminar el producto');
          }
        });
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