const helper={};


helper.nombreAleatorio=()=>{
    const base="0123456789abcdefghijhlmnopqrstuvwxyz";
    let nombre="";
    for (let i= 0; i<5 ; i++){
        nombre+=base.charAt(Math.floor(Math.random()*base.length))
    }
    return nombre;
};
/* helper.comentarios= async image=>{
    const comen = await Comentario.find({
        imagen_id: image
    }).sort({
        timestamp: -1
    });
   
    return comen;
}; */
module.exports=helper;
