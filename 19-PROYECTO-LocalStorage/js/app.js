/// Variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
// Event Listeners
eventListeners();

function eventListeners(){

    // Cuando el usuario agregar un nuevo Tweet

    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', () =>{
        tweets =  JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}

 
// Funciones 
function agregarTweet(e){
    e.preventDefault();

   // Text area donde el usuario escribe

   const tweet = document.querySelector('#tweet').value;

   // Validacion
    if (tweet === ''){
        mostrarError('El campo no puede ir vacio');
        
        return;// se evita que se ejecuten mas lineas de un codigo, solo funciona este return en una funcion
    }

    const tweetObj ={
        id: Date.now(),
        tweet: tweet
    }
    // Anadir al arreglo de tweet 
    tweets = [...tweets, tweetObj];

    // Una vez agregado creamos el HTML 
    crearHTML();

    // Reiniciar el formulario

    formulario.reset();
}

// Mostrar mensaje de error

function mostrarError (error){
    const mensajeError = document.createElement('p'); // la p es para parrafo
    mensajeError.textContent = error; 
    mensajeError.classList.add('error');

    // Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets 

function crearHTML (){

    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach(tweet => {

            // Agregar un boton de eliminar

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            // Anadir la funcion de eliminar

            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            // Crear un HTML

            const li = document.createElement('li');

            // anadir al texto 
            li.innerText = tweet.tweet;

            // Asignar el boton 

            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();

}

// Agregar los Tweets actuales a LocalStorage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar un tweet 

function borrarTweet (id){
    tweets =  tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

// Limpiar el HTML

function limpiarHTML(){
        while(listaTweets.firstChild){
            listaTweets.removeChild(listaTweets.firstChild)
        }
}