'use script'


const API_KEY = "mlbaWubHYWl4A3phtsnhRlwL8mPBSi5tWnFBBurP"




async function getSpaceImageDay() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data
}


async function getRandomSpaceImage(IWant) {
    const url = `https://images-api.nasa.gov/search?q=${IWant}&media_type=image`;
    const response = await fetch(url)
    const data = await response.json()

    const images = data.collection.items
    if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length)
        return images[randomIndex].links[0].href
    }
    return null // Caso não encontre imagens
}

const IMGreserve = {reserveIMG: "reserveImg.jpeg"}
async function BackgroundImageRandom(reserve) {
    const imageUrl = await getRandomSpaceImage("supernova")
    const reserveIMG = reserve.reserveIMG
    if (imageUrl) {
        document.documentElement.style.setProperty("--fundo", `url(${imageUrl})`)
    }else{
        document.documentElement.style.setProperty("--fundo", `url(./img/${reserveIMG})`)
    }
}

const logo = {img: "nasalogo.png"}
async function rendersLogo(url) {
    const menu = document.getElementById('area-opcoes')
    const logo = document.createElement('img')
    logo.id = "logo"
    logo.alt = "Logo da NASA"
    logo.src = `./img/${url}`

    menu.appendChild(logo)
}


const icons = {SVG: [
    {name: "Planet", SVG: "planet.svg"},
    {name: "Star", SVG: "star.svg"}
]}

async function rendersIcons(objectSVG) {
    const menu = document.getElementById('opcoes')

    const buttonI = editarIcon(objectSVG.name, objectSVG.SVG)
    buttonI.addEventListener('click', () => {
        const menuBotoes = document.querySelectorAll('#opcoes button')
        if((buttonI.classList.contains(`cima`))){
            menuBotoes.forEach(function(button){
                if(!(button.classList.contains(`button${objectSVG.name}`))){
                    button.classList.toggle("descer")
                    button.classList.toggle("cima")
                } 
            })
        }else if((buttonI.classList.contains(`descer`))){
            menuBotoes.forEach(function(button){
                button.classList.toggle("descer")
                button.classList.toggle("cima")
            })
        }
        
        
    })

    menu.appendChild(buttonI)
}
function editarIcon(name, SVG){
    const button = document.createElement('button')
    const icon = document.createElement('div')
    button.className = `button${name}`
    button.classList.add("cima")
    button.id = `${name}`
    icon.className = "icons"
    
    
    // Definindo a URL da imagem como máscara
    const maskUrl = `url('./icons/${SVG}')`

    icon.style.maskImage = maskUrl;
    icon.style.maskSize = 'contain'
    icon.style.maskPosition = 'center'
    icon.style.maskRepeat = 'no-repeat'
    
    button.appendChild(icon)
    
    return button
}


BackgroundImageRandom(IMGreserve)
rendersLogo(logo.img)
icons.SVG.forEach(rendersIcons)

const Planet = document.getElementById('Planet')
const Star = document.getElementById('Star')

Planet.addEventListener('click', renderCardDia)
Star.addEventListener('click', CriarListarStar)

async function CriarListarStar() {
    const visualisacao = document.getElementById('visualisacao')
    const areaOpcoes = document.getElementById('area-opcoes')
    if (document.getElementById("day")) {
        document.getElementById("day").remove()
        areaOpcoes.classList.toggle("area-opcoes-Planet")
        areaOpcoes.classList.toggle("area-opcoes")
    }
}

async function renderCardDia(){
    const visualisacao = document.getElementById('visualisacao')
    const areaOpcoes = document.getElementById('area-opcoes')
    if (document.getElementById("day")) {
        document.getElementById("day").remove()
        areaOpcoes.classList.toggle("area-opcoes-Planet")
        areaOpcoes.classList.toggle("area-opcoes")
    } else {
        

        areaOpcoes.classList.toggle("area-opcoes-Planet")
        areaOpcoes.classList.toggle("area-opcoes")
        const data = await getSpaceImageDay()
        const card = document.createElement('div')
        card.className = "card"
        card.id = "day"
        
        const top = document.createElement('div')

        const h2 = document.createElement('h2')
        h2.textContent = data.title

        const p = document.createElement('p')
        p.textContent = data.explanation

        const span = document.createElement('span')
        span.textContent = data.date

        top.appendChild(h2)
        top.appendChild(span)
        card.appendChild(top)

        if(data.media_type === 'video'){
            const video = criarImgOuVideo(data.media_type, data.hdurl || data.url)
            card.appendChild(video)
        }else if(data.media_type === 'image'){
            const img = criarImgOuVideo(data.media_type, data.hdurl || data.url)
            card.appendChild(img)
        }
        // data.copyright
        
        
        card.appendChild(p)
        visualisacao.appendChild(card)
    }
    
      
}
function criarImgOuVideo(type, url) {
    // Verifica se a URL é do YouTube
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    if (type === 'video') {
        if (isYouTube) {
            // Se for do YouTube, criar um iframe para exibir o vídeo
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${extrairIDDoVideo(url)}`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.width = "100%";
            iframe.style.height = "auto";
            return iframe;
        } else {
            // Se não for do YouTube, criar um elemento de vídeo normal
            const element = document.createElement('video');
            element.src = url;
            element.autoplay = true;
            element.loop = true;
            element.muted = true;
            element.style.pointerEvents = 'none';
            element.controls = false;
            element.style.width = "100%";
            element.style.height = "auto";
            return element;
        }
    } else if (type === 'image') {
        const element = document.createElement('img');
        element.src = url;
        return element;
    }

    return null;
}

function extrairIDDoVideo(url) {
    const regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})(?:[^\w\s]|$)/
    const match = url.match(regex)
    return match ? match[1] : null
}
