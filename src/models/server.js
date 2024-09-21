const express = require('express');

class Server{
    constructor(){//constructor 
        this.app= express();
        this.port = process.env.PORT || 3000; 
        this.middleware();
        this.rutas();
    }


    middleware () { //para que se ejecute en el medio , entre la peticion y lo que devuelva la api
        this.app.use(express.static('public'))
      }
      
      
  rutas(){
    //rutas integrante 1: 


    //rutas integrante 2 
   
    //rutas integrante 3 

  } 

  listen(){
    this.app.listen(this.port, ()=>{
    } );
    }
}

module.exports = Server; 
