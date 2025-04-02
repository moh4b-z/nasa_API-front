import {criarImgOuVideo} from "./cards.js"
import {getSpaceImageDay} from "./api.js"

export default async function renderCardDia(){
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

