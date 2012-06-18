
/*
 * GET home page.
 */
var _ = require('underscore');
var DATA={
  opciones: [{
                nombre: 'Clientes',
                url: '/clientes',
              },
              {
                nombre: 'Productos',
                url: '/devices',
              },
              {
                nombre: '@Productos',
                url: '/devicesABM',
              },
              {
                nombre: 'Secciones',
                url: '/secciones',
              }],
  clientes:[{
              nombre: 'SuperStar Hiper',
              telefono:2333,
            },
            {
              nombre: 'Casa Angelito',
              telefono:34513,
            },
            {
              nombre: 'Latina FM',
              telefono:85913,
            },
            {
              nombre: 'AutoServices Nataleo',
              telefono:2333,
            }
          ],
  devices:[{
              nombre: 'Computadora',
              descripcion: 'Arquitectura Computadora',
              caracteristicas: ['Cpu','Motherboard','Memoria','Disco','Monitor','Parlantes']
            },
            {
              nombre: 'Impresora',
              descripcion: 'Arquitectura Impresora',
              caracteristicas: ['Nro Serie','Marca','Modelo','Tipo']
            },
            {
              nombre: 'Alfajor',
              descripcion: 'un alfajorcito!',
              caracteristicas: ['Codigo','Marca','Gusto','Color']
            },
          ],
  devicesDATA:[{
    nombre:'Alfajor',
    registros:[{Codigo:'111',Marca:'Milka',Gusto:'Chocolate',Color:'Negro',id:1},{Codigo:'222',Marca:'Portezuelo',Gusto:'Chocolate',Color:'Negro',id:2}]
  },{
    nombre:'Impresora',
    registros:[{'Nro Serie':'HC111',Marca:'Epson',Modelo:'LX300',Tipo:'Matrizial',id:1}]
  }
  ],
  secciones:[{
    id:1,
    nombre:'SHOPPING',
    descripcion:'Sucursal Central',
    padre:false,
    hijos:[5]
  },
  {
    id:2,
    nombre:'HIPERCENTRO',
    descripcion:'El Hiper',
    padre:false,
    hijos:[]
  },{
    id:3,
    nombre:'PLAZA',
    descripcion:'El plaza',
    padre:false,
    hijos:[]
  },{
    id:4,
    nombre:'NORTE',
    descripcion:'El norte',
    padre:false,
    hijos:[]
  },{
    id:5,
    nombre:'TALLER',
    descripcion:'Taller de Jesus', 
    padre:1,
    hijos:[]
  }],
}

exports.index = function(req, res){
  res.render('index', { title: 'Inventario 0.2' })
};

exports.addDevice = function(req, res){
  console.log("consulto la coleccion:" + req.body.nombre);
  nombre=req.body.nombre;
  descripcion=req.body.descripcion;
  res.json({id:123});
};

exports.getOptions = function(req, res){
  console.log("retorno la coleccion de opciones");
  res.json(DATA.opciones);
};

exports.getDevices = function(req, res){
  console.log("retorno la coleccion de devices");
  res.json(DATA.devices);
};

exports.getClients = function(req, res){
  console.log("retorno la coleccion de clientes");
  res.json(DATA.clientes);
};

exports.clientnew=function(req,res){
  console.log("Nuevo Cliente\n Nombre:" + req.body.nombre + "\nTelefono:"+req.body.telefono);
  res.json({estado:true});
}

exports.devicenew=function(req,res){
  console.log("Nuevo Dispositivo\n Nombre:" + req.body.nombre+ "\nDescripcion:"+req.body.descripcion+"\nCaracteristicas:" + req.body.caracteristicas);
  DATA.devices.push({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    caracteristicas: req.body.caracteristicas
  });
  res.json({estado:true});
}

exports.devicenewreg=function(req,res){
  nombre=req.params.nombredispositivo;
  console.log("Guardo un nuevo registro de devices nombre:" + nombre);
  var producto = _(DATA.devicesDATA).detect(function(p) {
    return p.nombre == nombre;
  });

  if (typeof(producto) != "undefined"){
  req.body.id=producto.registros.length+1;
  producto.registros.push(req.body); //agrego el producto ingresado

  }
  res.json({estado:true});
}

exports.deviceeditreg=function(req,res){
  nombre=req.params.nombredispositivo;
  console.log("Edito un nuevo registro de devices nombre:" + nombre);

  var producto = _(DATA.devicesDATA).detect(function(p) {
    return p.nombre == req.params.nombredispositivo;
  });
  if (typeof(producto) != "undefined"){
  var registro = _(producto.registros).detect(function(p) {
    //return p.id == req.params.idd;
    if (p.id == req.params.idd){
      producto.registros[p]=req.body;
      //p=req.body;
      console.log(producto.registros[p]);
      //console.log(req.body);
    }
  });

//  req.body.id=producto.registros.length+1;
  //producto.registros.push(req.body);
  res.json({estado:true});
  }
}
exports.getDevicesGeneric=function(req,res){ //Retorna una coleccion generica de datos
  console.log("Retorno la coleccion generica:" + req.params.nombredispositivo);

  var producto = _(DATA.devicesDATA).detect(function(p) {
    return p.nombre == req.params.nombredispositivo;
  });


  if (typeof(producto) != "undefined"){
  res.json(producto.registros); //Retorno los registros asociados 
  }
  else{
    res.json({estado:true});
  }
}

exports.devicedeletereg=function(req,res){
  console.log("Elimino el device:" + req.params.idd);
  
  var producto = _(DATA.devicesDATA).detect(function(p) {
    return p.nombre == req.params.nombredispositivo;
  });
  if (typeof(producto) != "undefined"){
  var registro = _(producto.registros).detect(function(p) {
    return p.id == req.params.idd;
  });
  producto.registros.pop(registro); //Elimino el registro de la coleccion
  res.json({estado:true});
  }
}
exports.seccionnew=function(req,res){
  console.log("Ingreso nueva seccion");
  console.log(req.body.padre);
  if(req.body.padre){ //Si viene con el padre seteado se lo agrego
    req.body.id=DATA.secciones.length+1;
    DATA.secciones.push(req.body);
  _(DATA.secciones).detect(function(p) {
    if(p.id==req.body.padre){
      //secciones.push(p);
      console.log("padre:");
      console.log(p);
      p.hijos.push(req.body.id);
    }
  });    
  }else{
    req.body.hijos=[];
    req.body.id=DATA.secciones.length+1;
    DATA.secciones.push(req.body);
  }

  res.json({estado:true});
}
exports.getSeccion=function(req,res){
  console.log("Retorno la coleccion de secciones que no tengan padres");
  var secciones=[];
  _(DATA.secciones).detect(function(p) {
    if(p.padre==false){
      secciones.push(p);
    }
  });
  res.json(secciones);
}
exports.getSeccionID=function(req,res){
  console.log("Retorno la coleccion de secciones del ID:" + req.params.id);

  var seccion=_(DATA.secciones).detect(function(p) { //Obtengo la seccion
    return p.id == req.params.id;
  });

  var secciones=[];
  _(seccion.hijos).detect(function(seccion) { //Recorro los hijos de una seccion
  _(DATA.secciones).detect(function(hijo) {
    if ( hijo.id == seccion){
      console.log(hijo);
      secciones.push(hijo); //Agrego la seccion a la coleccion a retornar
    }
  });    
  });

  res.json(secciones);
}


