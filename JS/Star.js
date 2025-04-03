import {criarCard} from "./cards.js"
import {getListaDeElementos} from "./api.js"

export default async function CriarListarStar() {
    const areaOpcoes = document.getElementById('area-opcoes')
    
    if (document.getElementById("day")) {
        document.getElementById("day").remove()
        areaOpcoes.classList.toggle("area-opcoes-Planet")
        areaOpcoes.classList.toggle("area-opcoes")
        await CriarListarStar()
    }else if (document.getElementById("lista-cards")) {
        document.getElementById("lista-cards").className = "lista-cards-menor"
        setTimeout(() => {
            document.getElementById("lista-cards").remove()
        }, 1200)
        
    }else{
        const visualisacao = document.getElementById('visualisacao')
        const listaCards = document.createElement("div")
        const confirmaTipo = document.getElementById('logo').className
        const tipoElemento = confirmaTipo ? "video" : "image"
        listaCards.id = "lista-cards"

        const intens = await getListaDeElementos("supernova", tipoElemento)
        intens.forEach( async function(intem){
            const card = await criarCard(intem)
            listaCards.appendChild(card)
        })
        tonarUmaRolagem(listaCards)
        listaCards.className = "lista-cards-menor"
        visualisacao.appendChild(listaCards)
        setTimeout(() => {
            listaCards.className = "lista-cards"
        }, 10)
        
    }
    
}



function tonarUmaRolagem(elemento){
    let isDown = false
    let startX
    let scrollLeft

    elemento.addEventListener('mousedown', (e) => {
        isDown = true
        elemento.classList.add('active')
        startX = e.pageX - elemento.offsetLeft
        scrollLeft = elemento.scrollLeft
    })

    elemento.addEventListener('mouseleave', () => {
        isDown = false
        elemento.classList.remove('active')
    })

    elemento.addEventListener('mouseup', () => {
        isDown = false
        elemento.classList.remove('active')
    })

    elemento.addEventListener('mousemove', (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - elemento.offsetLeft
        const walk = (x - startX)
        elemento.scrollLeft = scrollLeft - walk
    })
}
