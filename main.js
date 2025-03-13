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
    const menu = document.getElementById('opcoes')
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
    const button = document.createElement('button')
    const icon = document.createElement('div')

    button.className = `button${objectSVG.name}`
    icon.className = "icons"
    icon.id = `${objectSVG.name}`
    
    
    // Definindo a URL da imagem como máscara
    const maskUrl = `url('./icons/${objectSVG.SVG}')`;

    icon.style.maskImage = maskUrl; 
    icon.style.maskSize = 'contain';
    icon.style.maskPosition = 'center';
    icon.style.maskRepeat = 'no-repeat';

    
    button.appendChild(icon)
    menu.appendChild(button)
}


BackgroundImageRandom(IMGreserve)
rendersLogo(logo.img)
icons.SVG.forEach(rendersIcons)
