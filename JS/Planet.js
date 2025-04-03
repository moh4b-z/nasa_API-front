import {criarImgOuVideo} from "./cards.js"
import {getSpaceImageDay} from "./api.js"

export default async function renderCardDia(){
    const visualisacao = document.getElementById('visualisacao')
    const areaOpcoes = document.getElementById('area-opcoes')
    if (document.getElementById("day")) {
        document.getElementById("day").remove()
        areaOpcoes.classList.toggle("area-opcoes-Planet")
        areaOpcoes.classList.toggle("area-opcoes")
    }else if (document.getElementById("lista-cards")) {
        document.getElementById("lista-cards").className = "lista-cards-menor"
        setTimeout(() => {
            document.getElementById("lista-cards").remove()
        }, 1200)
        setTimeout( async () => {
            await renderCardDia()
        }, 1250)
        
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

        const elemento = criarImgOuVideo(data.media_type, data.hdurl || data.url)
        card.appendChild(elemento)
        
        card.appendChild(p)
        visualisacao.appendChild(card)
    }
}

