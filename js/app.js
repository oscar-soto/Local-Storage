// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



// Event Listener
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweets);

    // Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    })
}


// Funcioneso
function agregarTweets(e) {
    e.preventDefault();
    
    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    // validacion
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; // Evita que se ejecuten mas lienas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]

    // Una vez agrado se crea HTML
    crearHTML();

    // Reinciar el formularion
    formulario.reset();
}

// Mostrar Mensaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            // Agregar un boron de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');
            // Añadir texto
            li.innerText = tweet.tweet

            // Asignar el btn
            li.appendChild(btnEliminar)
            
            // insertarlo en el HTML
            listaTweets.appendChild(li)
        });
    }

    sincronizarStorage();

}

// Agregar los tweets actuales con localStorage
function sincronizarStorage() {
    localStorage.setItem( 'tweets', JSON.stringify( tweets ) );
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}


function limpiarHTML() {
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}