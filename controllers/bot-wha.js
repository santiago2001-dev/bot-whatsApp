const {client} = require('../middelwares/conexion-wha');
const Producto = require('./curd-producto')
class Menu {

 
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
                      this.create()
                    
                     

                    }
                    if(message.body =='3'){
                      await client.sendMessage(message.from ,'Ingresa el nombre del producto seperado por coma el precio y cantidad a actualizar')
                      this.update()
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
                  'Hola soy bootStore Poli , ΒΏen que te puedo colaborar? ππ\n Estas son las opciones \n'+
                  '1.π Ver lista de productos \n'+
                  '2. β Agregar Productos \n'+
                  '3.π Actualizar Producto \n'
                  +'4.β Borrar Producto \n'
              );
                  }
                  })
                }

           
           
      getall(){
        const producto = new Producto();
        client.on('message', async message => {
          try {
            console.log(message.body);
            const name = message.body.trim();
            if (name == '1' ||name == '2' ||name == '3' ||name == '4' ) {
              this.menuPrincipal()
             } else {
              const result = await producto.getAllProduct();
              client.sendMessage(message.from, result);
            }
          } catch (error) {
            console.error(error);
            client.sendMessage(message.from, 'No se pudo obtener los productos');
          } finally{
            return
          }
        })
      }
      create(){
      const producto = new Producto();

      client.on('message',async message => {
      let array = message.body.split(",");
        let nameProduct = array[0];
        let priceProduct = array[1];
        let stockProduct = array[2];

        try{
           const product = message.body.trim();
           if (product == '1' ||product == '2' ||product == '3' ||product == '4' ) {
            this.menuPrincipal();
           }else{
            let resultado = await producto.addProduct(nameProduct,priceProduct,stockProduct)
            client.sendMessage(message.from,resultado)
           }
        

          }catch(error){
            console.log(error)
            client.sendMessage(message.from,'No se pudo agregar el producto')
          }finally{
            return
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
          } finally{
            return
          }
        })
      }
      

    update(){
      const producto = new Producto();
      client.on('message', async message => {
        let array = message.body.split(",");
        let nameProduct = array[0];
        let priceProduct = array[1];
        let stockProduct = array[2];
        const name = message.body.trim();
        try{
          if (name == '1' ||name == '2' ||name == '3' ||name == '4' ) {
            this.menuPrincipal()
          }else{
            let resultado = await producto.updateProduct(nameProduct,priceProduct,stockProduct)
            client.sendMessage(message.from,resultado)
          }
        }catch(error){
            console.log(error)
            client.sendMessage(message.from,'No se pudo actualizar el producto')
        }finally{
          return
        }
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