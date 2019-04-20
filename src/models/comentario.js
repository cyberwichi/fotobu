const mongoose=require('mongoose');
const {Schema, model}=mongoose;
const {ObjectId}=Schema;


const SchemaComentario =new Schema({

    imagen_id: {type: String},
    nombre: {type: String},
    comentario: {type: String},
    avatar: {type: String},
    timestamp: {type: Date, default:Date.now}


});

module.exports= model('Comentario', SchemaComentario);