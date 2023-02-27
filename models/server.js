const cors = require('cors')
const express = require('express')
const Menu = require('../controllers/bot-wha')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middelwares();
       this.controller();

    }



    middelwares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({limit: '50mb'}));
    }

    controller(){
    const menu = new  Menu();
    menu.opciones();

    }


    listen(){

        this.app.listen(this.port,()=>{
            console.log(`Server is running on port ${this.port}`)
        })

    }
}

module.exports = Server