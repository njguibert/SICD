
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
                nombre: 'Dispositivos',
                url: '/devices',
              },
              {
                nombre: '@Dispositivos',
                url: '/devicesABM',
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
    registros:[{Codigo:'111',Marca:'Milka',Gusto:'Chocolate',Color:'Negro'},{Codigo:'222',Marca:'Portezuelo',Gusto:'Chocolate',Color:'Negro'}]
  }]
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
  res.json({estado:true});
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