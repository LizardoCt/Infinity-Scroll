const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '5fDt9J_DVmVpZ0F03CnEBY59hSfbFYQnK1gYZhhJv_M';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all image were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// funcion auxiliar para crear atributos en el Elemento DOM
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// crear elementos para Links y Photos, agregar al DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // correr funcion por cada objeto en photosArray
    photosArray.forEach((photo) => {
        // crear <a> para link de Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // crear <img> para 'photo'
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, revisar cuando cada uno termina de cargar
        img.addEventListener('load', imageLoaded);
        // poner <img> dentro <a>, luego poner ambos dentro del elemento imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// obtener photos de Unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // capturar error aqui
    }
}

// revisar si se hace Scroll hasta abajo de la pagina, Cargar mas fotos.
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();