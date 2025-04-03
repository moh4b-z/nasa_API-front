import {criarCard} from "./cards.js"
import {getListaDeElementos} from "./api.js"

export default async function CriarListarStar() {
    const visualisacao = document.getElementById('visualisacao')
    const areaOpcoes = document.getElementById('area-opcoes')
    if (document.getElementById("day")) {
        document.getElementById("day").remove()
        areaOpcoes.classList.toggle("area-opcoes-Planet")
        areaOpcoes.classList.toggle("area-opcoes")
    }
    const listaCards = document.createElement("div")
    listaCards.id = "lista-cards"

    const intens = await getListaDeElementos("supernova", "image")
    intens.forEach( async function(intem){
        const card = await criarCard(intem)
        listaCards.appendChild(card)
    })

    visualisacao.appendChild(listaCards)
}