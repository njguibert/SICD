
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
    nombre: 'CPU',
    descripcion: 'procesador pc',
  },
  {
    nombre: 'Alfajor',
    descripcion: 'un alfajorcito!',
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
  res.json({estado:true});
}

