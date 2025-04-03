
export async function criarCard(dados) {
    const card = document.createElement("div")
    card.className = "card"

    const h2 = document.createElement("h2")
    h2.textContent = dados.data[0].title
    card.appendChild(h2)

    const p = document.createElement("p")
    p.textContent = dados.data[0].description
    card.appendChild(p)

    const spanDate = document.createElement("span")
    spanDate.textContent = `Data: ${new Date(dados.data[0].date_created).toLocaleDateString()}`
    card.appendChild(spanDate)

    const spanCenter = document.createElement("span")
    spanCenter.textContent = `Centro: ${dados.data[0].center}`
    card.appendChild(spanCenter)

    if (dados.data[0].secondary_creator) {
        const spanCreator = document.createElement("span")
        spanCreator.textContent = `Criado por: ${dados.data[0].secondary_creator}`
        card.appendChild(spanCreator)
    }

    
    const urlDaImgOuVideo = await buscarLink(dados.href)
    const elemento = criarImgOuVideo(dados.data[0].media_type, urlDaImgOuVideo)
    card.appendChild(elemento)

    return card
}
async function buscarLink(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (Array.isArray(data) && data.length > 0) {
            return data[0] // Retorna o primeiro elemento da lista
        } else {
            throw new Error("A resposta da API não é uma lista válida ou está vazia.")
        }
    } catch (error) {
        console.error("Erro ao obter o primeiro elemento:", error)
        return null
    }
}

export function criarImgOuVideo(type, url) {
    // Verifica se a URL é do YouTube
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    if (type === 'video') {
        if (isYouTube) {
            const iframe = document.createElement('iframe')
            iframe.src = `https://www.youtube.com/embed/${extrairIDDoVideo(url)}`
            iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            iframe.allowFullscreen = true
            iframe.style.width = "100%"
            iframe.style.height = "auto"
            return iframe
        } else {
            const element = document.createElement('video')
            element.src = url
            element.autoplay = true
            element.loop = true
            element.muted = true
            element.style.pointerEvents = 'none'
            element.controls = false;
            element.style.width = "100%"
            element.style.height = "auto"
            return element
        }
    } else if (type === 'image') {
        const element = document.createElement('img')
        element.src = url
        return element
    }

    return null
}

export function extrairIDDoVideo(url) {
    const regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})(?:[^\w\s]|$)/
    const match = url.match(regex)
    return match ? match[1] : null
}
