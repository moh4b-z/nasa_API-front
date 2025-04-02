import {criarImgOuVideo} from "./cards.js"

export default async function CriarListarStar() {
    const visualisacao = document.getElementById('visualisacao')
    const areaOpcoes = document.getElementById('area-opcoes')
    if (document.getElementById("day")) {
        document.getElementById("day").remove()
        areaOpcoes.classList.toggle("area-opcoes-Planet")
        areaOpcoes.classList.toggle("area-opcoes")
    }
}