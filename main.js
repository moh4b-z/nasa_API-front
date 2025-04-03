'use script'
import renderCardDia from "./JS/Planet.js"
import CriarListarStar from "./JS/Star.js"
import {getRandomSpaceImage} from "./JS/api.js"


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





// const scrollContainer = document.getElementById('lista-cards')

// let isDown = false
// let startX
// let scrollLeft

// scrollContainer.addEventListener('mousedown', (e) => {
//     isDown = true
//     scrollContainer.classList.add('active')
//     startX = e.pageX - scrollContainer.offsetLeft
//     scrollLeft = scrollContainer.scrollLeft
// })

// scrollContainer.addEventListener('mouseleave', () => {
//     isDown = false
//     scrollContainer.classList.remove('active')
// })

// scrollContainer.addEventListener('mouseup', () => {
//     isDown = false
//     scrollContainer.classList.remove('active')
// })

// scrollContainer.addEventListener('mousemove', (e) => {
//     if (!isDown) return
//     e.preventDefault()
//     const x = e.pageX - scrollContainer.offsetLeft
//     const walk = (x - startX) * 2 // Velocidade do arrasto
//     scrollContainer.scrollLeft = scrollLeft - walk
// })
