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
    const menuBaixo = document.getElementById('baixo-opcoes')
    const menuBotoes = document.querySelectorAll('#opcoes button')
    const menuBaixoBotoes = document.querySelectorAll('#baixo-opcoes button')
    

    const button = editarIcon(objectSVG.name, objectSVG.SVG)
    button.addEventListener('click', () => {
        
        menuBaixo.style.top = '-100%'
        menuBotoes.forEach(function(button){
            if(button.className != `button${objectSVG.name}`){
                button.style.visibility = 'hidden'
                console.log("oi");
            }
        })
        
        menuBaixo.style.top = '0%'
        menuBaixoBotoes.forEach(button => button.style.visibility = 'visible')
        document.querySelector(`#baixo-opcoes .${button.className}`).style.visibility = 'hidden'
        
    })

    
    const buttonBaixo = editarIcon(objectSVG.name, objectSVG.SVG)
    buttonBaixo.addEventListener('click', () => {
        menuBaixoBotoes.forEach(button => button.style.visibility = 'visible')
        // Esconde o botão clicado
        menuBaixo.style.top = '0%'
        // Mostra apenas o botão correspondente da primeira div
        menuBotoes.forEach(function(button){
            if(button.className != `button${objectSVG.name}`){
                button.style.display = 'none'
            }else{
                button.style.display = 'flex'
            }
        })
    })

    menu.appendChild(button)
    menuBaixo.appendChild(buttonBaixo)
}
function editarIcon(name, SVG){
    const button = document.createElement('button')
    const icon = document.createElement('div')
    button.className = `button${name}`
    icon.className = "icons"
    icon.id = `${name}`
    
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
