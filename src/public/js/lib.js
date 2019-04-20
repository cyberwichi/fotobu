$('#botonLikes2').click((e) => {
    e.preventDefault();
    const imgid = $('#botonLikes2').data('apo');
    console.log(imgid);
    $.post('/images/' + imgid + '/like')
        .done(data => {
            $('#contadorlikes2').text(data.likes);
        });
});

function botonLikes(filename, fileId) {
    $.post('/images/' + filename + '/like')
        .done(data => {
            var selector = "#likes" + fileId;
            $('#likes' + fileId).text(data.likes);
        });
};

$('.btn-borrar').click((e) => {
    e.preventDefault();
    const imgid = $('.btn-borrar').data('apo');
    const confirmacion = confirm('¿desea eliminar la imagen?');
    if (confirmacion) {
        console.log(imgid);
        $.ajax({
                url: '/images/' + imgid,
                type: 'DELETE'
            })
            .done(result => {
                console.log(result);
            });
    }
});

$('.ocultable').hide();
$('.ocultable2').hide();

$('.activador').click(function () {

    $('.ocultable').slideToggle();
});
$('.activator').click(function () {

    $('.ocultable2').slideToggle();
});
const selector= document.querySelectorAll('ul[id^="comentario"]' );
console.log(selector);
$('selector.li').hide();
//$(selector, nth-child(2)).show();

//$("ul li:gt(2)").hide(); // solo se ven los tres primeros comentarios

function mostrarMas(id) {
    console.log(id);
    $("#comentario"+id+" li").show();

};

/* $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  }); */

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

let anteriorScroll = document.documentElement.scrollTop;

window.onscroll = function () {
    myFunctionScroll();
    console.log(document.documentElement.scrollTop);

};


function myFunctionScroll() {
    if (document.documentElement.scrollTop > anteriorScroll) {
        $('.navegacion').css({
            top: "-70px"
        });

        anteriorScroll = document.documentElement.scrollTop;
    } else {
        $('.navegacion').css({
            top: "0px"
        });
        anteriorScroll = document.documentElement.scrollTop;
    }
}