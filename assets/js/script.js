// Seleccionamos el botón
const btnSubir = document.getElementById('btn-subir');

// Evento click con smooth scroll
btnSubir.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
