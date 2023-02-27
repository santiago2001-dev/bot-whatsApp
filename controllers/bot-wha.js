//const db = require('../db/config');
const {client} = require('../middelwares/conexion-wha');
class Menu {

    constructor(){
         this.codigo_pais = "57";
        this.number = "3222354356";
        this.chatID;

    }


 //menu de opciones 


  opciones = async()=>{
    this.chatID = this.codigo_pais + this.number + "@c.us";

  client.on('message',async(message)=>{
    console.log(message.body)
    if(message.body){

         await client.sendMessage(this.chatID,
            'Hola soy bootStore Poli , ¿en que te puedo colaborar?\n Estas son las opciones \n'+
            '1. Agregar Productos \n'+
            '2. Ver lista de productos \n'+
            '3. Actualizar Producto \n'
     );

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