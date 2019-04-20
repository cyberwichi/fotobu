const {Comentario}=require('../models');
const moment=require('moment');
var helpers={};
helpers=require('handlebars-helpers')();


helpers.timeago= timestamp =>{
    moment.locale('es');
    return moment(timestamp).startOf('minute').fromNow();
};
helpers.comentar= async image=>{
    const comen = await Comentario.find({
        imagen_id: image
    });

   console.log(comen);

    console.log("comentariosnjkhfjhedgfjherjkg");
    return comen;
    //
};
helpers.comentariosBusca = async (id) =>{
    const comentarios = await Comentario.find({ imagen_id: id});
    return  comentarios;
}



module.exports=helpers;