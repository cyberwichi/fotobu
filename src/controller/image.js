const path = require('path');
const fs = require('fs-extra');
const {
    nombreAleatorio
} = require('../helpers/lib');
const {
    Image,
    Comentario
} = require('../models'); //por defecto busca index.js que es donde ponemos los modelos
const toonavatar = require('cartoon-avatar');

const control = {};


control.index = async (req, res) => {

    const image = await Image.findOne({
        filename: {
            $regex: req.params.image_id
        }
    });
    if (image) {
        image.views++;
        await image.save();
        const comen = await Comentario.find({
            imagen_id: image._id
        }).sort({
            timestamp: -1
        });

        console.log(image._id);
        console.log(comen);

        res.render('image', {
            image,
            comen
        });

    } else{
        res.redirect("/");
        //ay que crear una ruta y vistas para errores
    }

};

control.like = async (req, res) => {
    const image= await Image.findOne({filename: req.params.image_id});
    if (image){
        image.likes++
        await image.save();
        res.json({likes: image.likes});       
    } else{
        res.redirect('/');
    }
};

control.create = (req, res) => {

    const guardaImagen = async () => {
        const nombreNuevo = nombreAleatorio();
        const images = Image.find({
            filename: nombreNuevo //aqui vemos si el nombre ya esta asignado
            //hay tambien que ver si boda: es igual a la del visitante
            //es decir que el nombre se pueda repetir en diferentes bodas
        });
        if (images.lenght > 0) {
            guardaImagen();
        } else {
            const ext = path.extname(req.file.originalname).toLowerCase();
            const rutaTemporalImagen = req.file.path;
            const destinoImagen = path.resolve(`src/public/upload/${nombreNuevo}${ext}`);


            //console.log(rutaTemporalImagen);
            //console.log(destinoImagen);

            if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
                await fs.rename(rutaTemporalImagen, destinoImagen);

                const imageNueva = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: nombreNuevo + ext
                });

                const imageGuardada = await imageNueva.save();
                console.log(imageGuardada);
                res.redirect('/images/' + nombreNuevo);

            } else {
                await fs.unlink(rutaTemporalImagen);
                res.status(500).json({
                    error: 'SOLO SE PERMITEN IMAGENES'
                });
                //hacer esto mas bonito con una vista

            }
        }
    };
    guardaImagen();
};



control.comment = async (req, res) => {
    const image = await Image.findOne({
        filename: {
            $regex: req.params.image_id
        }
    })
    if (image) {
        const nuevoComentario = new Comentario(req.body);
        nuevoComentario.avatar = toonavatar.generate_avatar();
        nuevoComentario.imagen_id = image._id;
        const comentarioGuardado = await nuevoComentario.save();
        res.redirect("/#image"+image.uniqueId);
    } else{
        res.redirect("/");
    }





};
control.delete = async (req, res) => {
    const image= await Image.findOne({filename: req.params.image_id});
    console.log(image);
    if (image){
        await fs.unlink(path.resolve('./src/public/upload/'+image.filename));
        await Comentario.deleteMany({"imagen_id" : image._id});
        await image.remove();
        res.send('ok');
    }
};

module.exports = control;