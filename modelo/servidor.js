const express=require('express')
const morgan=require('morgan')
const productoRuta=require('../rutas/producto')
const apiRuta = require('../rutas')
const path=require('path')
const handlebar=require('express-handlebars')

class Servidor{

  constructor(){

     this.app=express()
     this.port=process.env.PORT || '8080'

     //Middlewares
      this.app.use(morgan('dev'))
      this.app.use(express.json())
      this.app.use(express.static(process.cwd()+'\\public'))
      this.app.use(express.urlencoded({ extended: true }))
     

      // Ruta de la Api en http://localhost:8080/api
      // prefijo, por el tema de versiones de la API
       this.apiCaminos={
         api:'/api',
         productos:'/api/productos'
       }
       this.rutas()
       this.manErrores()
       //this.handlerbars()
  }

   rutas(){
     this.app.use(this.apiCaminos.api,apiRuta)
     this.app.use(this.apiCaminos.productos,productoRuta)
   }
  
   manErrores(){
      this.app.use((err,req,res,next)=>{
        res.json({
          Mensage: 'Ha ocurrido un error',
          Error:err.message,
          status:err
        });
         //return next()
      })

   }

   handlerbars(){
     console.log('Trabajando con el Motor de Plantillas HandleBars') 
    this.app.engine('hbs',handlebar.engine({
      extname:'.hbs',
      defaultLayout:'index.hbs',
      layoutsDir:(process.cwd()+'\\views\\layouts'),
      partialsDir:(process.cwd()+'\\views\\partials')
    }))      

    this.app.set("views", (process.cwd()+'\\views'));
    this.app.set('view engine','hbs')

   }
    
   pug(){

    console.log('Trabajando con el Motor de Plantillas Pug') 
    this.app.set("views", (process.cwd()+'\\views'));
    this.app.set('view engine','pug')
    //this.app.use(express.static(path.join(__dirname, "public")));
    
   }

   escuchando(){
      this.app.listen(this.port,()=>{
        console.log(`Servidor respondiendo en el puerto ${this.port}`)
      })
  }

}

module.exports=Servidor