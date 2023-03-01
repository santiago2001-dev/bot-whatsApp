const {client} = require('../middelwares/conexion-wha');
const Producto = require('./curd-producto')
class Menu {

    constructor(){
        this.nameProduct
        this.priceProduct
        this.stockProduct
        this.produ


    }


 //menu de opciones 


  opciones = ()=>{
    this.chatID = this.codigo_pais + this.number + "@c.us";

  client.on('message',message=>{
    //console.log(message.body)
    if(message.body  && !message.body.includes  ('1') && !message.body.includes  ('2')&& !message.body.includes  ('3')&& !message.body.includes('4')){

          client.sendMessage(message.from,
            'Hola soy bootStore Poli , ¿en que te puedo colaborar? 😀👋\n Estas son las opciones \n'+
            '1.🔍 Ver lista de productos \n'+
            '2. ➕ Agregar Productos \n'+
            '3.🔁 Actualizar Producto \n'
            +'4.✖ Borrar Producto \n'
     );
          }
                if(message.body == '1'){
                
                    const producto = new Producto();
                    producto.getAllProduct().then((products) => {
                     console.log(products);
                     client.sendMessage(message.from,products);

                    });
                    
                    
                    }
                  if(message.body =='2'){
                     client.sendMessage(message.from,'porfavor ingresa los datos del producto a registrar\n'+ 
                    'a.porfavor ingresa el nombre del producto\n'
                    +'b.porfavor ingresa el precio del producto\n'
                    +'c.porfavor ingresa la cantidad de unidades del producto\n'+
                    'ingresa la '

                    )

                    // this.nameProduct = message.body
                    // await client.sendMessage(message.from,'porfavor ingresa el precio del producto')
                    // this.priceProduct = message.body
                    // await client.sendMessage(message.from,'porfavor ingresa la cantidad de unidades del producto')
                    // this.stockProduct = message.body


                 }
                 if(message.body =='3'){
                  

                 }
                 if(message.body =='4'){

                 }
 })
}


    createProduct  (){
        this.saveName();
        this.savePrice();
        this.saveStock();

    }

    saveName(){
        client.on('message',message => {
            
            client.sendMessage(message.from,'porfavor ingresa el nombre de el producto')
           this.nameProduct = message.body

     });
        
    }


    savePrice(){
      
            
            client.sendMessage(message.from,'porfavor ingresa el precio del producto')
           this.priceProduct = message.body
    
         ;
            
    }
    saveStock(){
        client.on('message',message => {
            
            client.sendMessage(message.from,'porfavor ingresa la cantidad de unidades del producto')
           this.stockProduct = message.body
    
            });
          

    }
    updateProduct(){

    }
    deleteProduct(){

    }
    listProduct(){

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