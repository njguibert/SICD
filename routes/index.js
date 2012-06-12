
/*
 * GET home page.
 */
var Popciones = [
  {
    nombre: 'Clientes',
    url: '/clientes',
  },
  {
    nombre: 'Dispositivos',
    url: '/devices',
  },
  {
    nombre: '@Dispositivos',
    url: '/devicesABM',
  },  
];
var Pclientes=[
  {
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
];
var Pdevices = [
  {
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
];



exports.index = function(req, res){
  res.render('index', { title: 'Inventario 0.2' })
};
exports.sistema = function(req, res){
  res.render('sistema',{ title: 'Inventario 0.2' });
};

exports.addDevice = function(req, res){
  console.log("consulto la coleccion:" + req.body.nombre);
  nombre=req.body.nombre;
  descripcion=req.body.descripcion;
  res.json({id:123});
};
exports.getOptions = function(req, res){
  console.log("retorno la coleccion de opciones");
  res.json(Popciones);
};

exports.getDevices = function(req, res){
  console.log("retorno la coleccion de devices");
  res.json(Pdevices);
};

exports.getClients = function(req, res){
  console.log("retorno la coleccion de clientes");
  res.json(Pclientes);
};

exports.clientnew=function(req,res){
  console.log("Nuevo Cliente");
  console.log("Nombre: " +req.body.nombre);
  console.log("Telefono:" + req.body.telefono);
  res.json({estado:true});
}
exports.devicenew=function(req,res){
  console.log("Nuevo Dispositivo");
  console.log("Nombre: " +req.body.nombre);
  console.log("Descripcion:" + req.body.descripcion);
  console.log("Caracteristicas:" + req.body.caracteristicas);
  var d={
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    caracteristicas: req.body.caracteristicas
  }
  Pdevices.push(d);
  res.json({estado:true});
}
exports.devicenewreg=function(req,res){
  nombre=req.params.nombredispositivo;
  console.log("Guardo un nuevo registro de devices nombre:" + nombre);
  res.json({estado:true});
}
exports.getDevicesGeneric=function(req,res){ //Retorna una coleccion generica de datos
  console.log("Retorno la coleccion generica:" + req.params.nombredispositivo);
  res.json({estado:true});
}