let control = {};
const plantilla={imagenes:{},comentarios:{}};

const { Image, Comentario } = require("../models");

control.index = async (req, res) => {
  const images = await Image.find().sort({
    _id: -1
  });
  plantilla.imagenes=images;


  const coments = await Comentario.find().sort({
    _id: -1
  });
plantilla.comentarios=coments;
  
 

  
  res.render("index",{images, coments});
};



module.exports = control;
